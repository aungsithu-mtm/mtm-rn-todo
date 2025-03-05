import ShowToast from "@/utils/toast";
import {
  UserChangePasswordInput,
  UserInput,
  UserProviderInput,
} from "@/domain/graphql/input/UserInput";
import {
  useLoginMutation,
  useRegisterMutation,
  useResetMutation,
  useUpdateProviderMutation,
  useUserDeleteMutation,
  useProfileUpdateMutation,
  useChangePasswordMutation,
} from "@/domain/graphql/mutation/user";
import { AuthType, ForgetFormValues } from "@/types";
import { errorHandler } from "@/utils/errorHandler";
import { deleteAsyncStorage, saveAsyncStorage } from "@/utils/localStorage";
import {
  ApolloError,
  ApolloQueryResult,
} from "@apollo/client";
import {
  useClerk,
  useSignIn,
  useSignUp,
  useUser
} from "@clerk/clerk-expo";
import { ClerkAPIErrorJSON } from "@clerk/types";
import { useRouter } from "expo-router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useProfileQuery,
  UserProfileResponse
} from '@/domain/graphql/query/user'
import { User } from "@/types";
import apolloClient from "@/apollo/client";

type Props = {
  onLogin?: (data: Omit<AuthType, "username">) => Promise<any>;
  onRegister?: (data: AuthType) => Promise<any>;
  onSocialLogin?: (response: any) => Promise<any>;
  onVerify?: (code: string) => Promise<any>;
  onUpdateProvider?: (data: UserProviderInput) => Promise<any>;
  onLogout?: () => void;
  onForgotPassword?: (email: string) => Promise<any>;
  onResetPassword?: (data: ForgetFormValues) => Promise<any>;
  onResendVerificationCode?: () => void;
  onProfileUpdate: (data: User) => Promise<any>;
  loadingProfile: boolean;
  errorProfile?: ApolloError;
  profile?: User;
  refetchProfile: (
    variables?: undefined
  ) => Promise<ApolloQueryResult<UserProfileResponse>>;
  onChangePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<any>;
  onDeleteAccount: () => Promise<any>;
};

const AuthContext = createContext<Props>({} as Props);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const client = apolloClient();
  const navigation = useRouter();
  const { signOut } = useClerk();
  const { signIn, setActive, isLoaded } = useSignIn();
  const {
    isLoaded: isLoadedSignUp,
    signUp,
    setActive: setActiveSignUp,
  } = useSignUp();
  const [token, setToken] = useState<string | undefined>(undefined);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [updateProvider] = useUpdateProviderMutation();
  const [reset] = useResetMutation();
  const [deleteAccount] = useUserDeleteMutation();
  const [updateProfile] = useProfileUpdateMutation();
  const [changePassword] = useChangePasswordMutation();
  const [registerData, setRegisterData] = useState<UserInput>();
  const { user } = useUser();
  const [
    userProfile,
    {
      called: calledProfile,
      loading: loadingProfile,
      data: dataProfile,
      error: errorProfile,
      refetch: refetchProfile,
    },
  ] = useProfileQuery(
    () => { },
    (e) => console.log(e.message)
  );

  useEffect(() => {
    (async () => {
      await userProfile();
    })();
  }, [token]);

  const onLogin = async (data: Omit<AuthType, "username">) => {
    const input = {
      email: data.email,
      password: data.password,
    };

    if (!isLoaded) return;
    try {
      // Clerk signIn
      const result = await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        // graphQL for mongoDB
        const gqlResult = await login({
          variables: {
            input,
          },
        });

        if (gqlResult.data) {
          setActive({ session: result.createdSessionId });
          setTokenAsync(gqlResult.data.login.token);
        }
      }
    } catch (error) {
      await signOut();
      const errorMessage = error as ApolloError | ClerkAPIErrorJSON;
      ShowToast("Error", errorHandler(errorMessage), "error");
    }
  };

  const onSocialLogin = async (response: any) => {
      try {
            const { createdSessionId, signUp, signIn } = response;
            if (createdSessionId && signUp) {
                  const result = await register({
                      variables: {
                          input: {
                              email: signUp.emailAddress!,
                              username: `${signUp.firstName ?? ""} ${signUp.lastName ?? ""}`.trim(),
                              password: "",
                          },
                      },
              });
                  if (result.data) {
                      await setActiveSignUp?.({ session: createdSessionId });
                      setTokenAsync(result.data.register.token);
                  }
              }
              if(createdSessionId && signIn){
                  setActive?.({ session: createdSessionId });
              }
          } catch (err) {
              console.error("Error during social login:", err);
          } 
  }
  
  const onRegister = async (data: AuthType) => {
    if (!isLoadedSignUp) return;
    try {
      // Clerk signUp
      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      setRegisterData({
        email: data.email,
        password: data.password,
        username: data.username,
      });

      // Prepare email verification
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Navigate to email verification page
      navigation.replace("/auth/emailVerify");
    } catch (error) {
      const errorMessage = error as ApolloError | ClerkAPIErrorJSON;
      ShowToast("Error", errorHandler(errorMessage), "error");
    }
  };

  const onUpdateProvider = async (data: UserProviderInput) => {
    try {
      const result = await updateProvider({
        variables: {
          input: data,
        },
      });
    } catch (error) {
      const errorMessage = error as ApolloError;
      ShowToast("Error", errorHandler(errorMessage)!, "error");
    }
  };

  const onVerify = async (code: string) => {
    try {
      if (!isLoadedSignUp) return;
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (signUpAttempt.status === "complete") {
        const result = await register({
          variables: {
            input: registerData!,
          },
        });
        if (result.data) {
          await setActiveSignUp({ session: signUpAttempt.createdSessionId });
          setTokenAsync(result.data.register.token);
          navigation.replace("/(drawer)/(tabs)/(todo)/pages");
        }
      } else {
        console.warn(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      console.log("Error", err);
      const error = err as ClerkAPIErrorJSON;
      ShowToast("Error", errorHandler(error)!, "error");
    }
  };

  const onChangePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      if (!user) return;
      const input: UserChangePasswordInput = {
        newPassword,
        currentPassword,
      };
      await user.updatePassword({ currentPassword, newPassword });
      const response = await changePassword({
        variables: {
          input,
        },
      });
      if (response.data) {
        ShowToast("Success", "Password changed successfully.", "success");
      }
    } catch (error) {
      const err = error as ClerkAPIErrorJSON;
      ShowToast("Error", err.message, "error");
    }
  };

  const onResendVerificationCode = async () => {
    if (!isLoadedSignUp) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error) {
      const err = error as ClerkAPIErrorJSON;
      ShowToast("Error", errorHandler(err), "error");
    }
  };

  const onForgotPassword = async (email: string) => {
    if (!isLoaded) return;
    try {
      const response = await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      if (response.status === "needs_first_factor") {
        return true;
      }
      return false;
    } catch (err) {
      const error = err as ClerkAPIErrorJSON;
      ShowToast("Error", errorHandler(error), "error");
    }
  };

  const onProfileUpdate = async (data: User) => {
    try {
      if (!user) return;
      const response = await updateProfile({
        variables: {
          input: data,
        },
      });
      if (response.data) {
        // navigation.navigate("/(tabs)/(user)/setting");
        ShowToast(
          "Success",
          response.data.updateUserProfile.message,
          "success"
        );
      }
    } catch (err) {
      const error = err as ClerkAPIErrorJSON | ApolloError;
      ShowToast("Error", errorHandler(error), "error");
    }
  };

  const onResetPassword = async (data: ForgetFormValues) => {
    const input = {
      email: data.email,
      password: data.password,
    };
    if (!isLoaded) return;
    try {
      const response = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: data.code as string,
        password: data.password as string,
      });
      if (response.status === "complete") {
        const gqlResult = await reset({
          variables: {
            input,
          },
        });
        if (gqlResult.data) {
          setActive({ session: response.createdSessionId });
        }
      }
      return response;
    } catch (err) {
      const error = err as ClerkAPIErrorJSON | ApolloError;
      ShowToast("Error", errorHandler(error), "error");
    }
  };

  const onDeleteAccount = async () => {
    if (!isLoaded) return;
    try {
      await user?.delete();
      const response = await deleteAccount();
      if (response.data) {
        ShowToast("Success", response.data.deleteUser.message, "success");
      }
     await onLogout();
    } catch (err) {
      const error = err as ClerkAPIErrorJSON | ApolloError;
      ShowToast("Error", errorHandler(error), "error");
    }
  };

  const setTokenAsync = async (token: string) => {
    await saveAsyncStorage("token", token);
    setToken(token);
  };

  const onLogout = async () => {
    try {
      setToken(undefined);
      await signOut();
      await client.resetStore();
      await deleteAsyncStorage("token");
      navigation.replace("/auth/signin");
    } catch (err) {
      const error = err as ClerkAPIErrorJSON | ApolloError;
      ShowToast("Error", errorHandler(error), "error");
    }
  };

  const value = {
    onLogin,
    onLogout,
    onRegister,
    onSocialLogin,
    onUpdateProvider,
    onVerify,
    onForgotPassword,
    onResetPassword,
    onResendVerificationCode,
    onProfileUpdate,
    onChangePassword,
    onDeleteAccount,
    loadingProfile: loadingProfile && calledProfile,
    errorProfile,
    profile: dataProfile && dataProfile.userProfile,
    refetchProfile
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

export default AuthContext;
