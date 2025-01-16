import { UserInput } from "@/domain/graphql/input/UserInput";
import { useState } from "react";
import { useUserCreateMutation } from "@/domain/graphql/mutation/user";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ShowToast from "@/utils/toast";
import { errorHandler } from "@/utils/errorHandler";
import { AddUserForm } from "@/types";

interface ClerkAPIErrorJSON {
    code: string;
    message: string;
    long_message?: string;
    meta?: {
        param_name?: string;
        session_id?: string;
        email_addresses?: string[];
        identifiers?: string[];
        zxcvbn?: {
            suggestions: {
                code: string;
                message: string;
            }[];
        };
    };
}

export default function UserRepository() {
    const router = useRouter();
    const {
        signUp,
        isLoaded: isLoadedSignUp,
    } = useSignUp();
    const [createUser, { loading, error }] = useUserCreateMutation();

    const onVerify = async (code: string, data: UserInput): Promise<boolean> => {
        try {
            const signUpAttempt = await signUp?.attemptEmailAddressVerification({
                code,
            });
            if (signUpAttempt?.status === "complete") {
                return true
            } else {
                console.warn(JSON.stringify(signUpAttempt, null, 2));
                return false
            }
        } catch (err) {
            const error = err as ClerkAPIErrorJSON;
            ShowToast("Error", errorHandler(error)!, "error");
            return false
        }
    };

    const onCreate = async (data: AddUserForm): Promise<boolean> => {
        try {
            console.log("Data", data)
            const result = await createUser({
                variables: {
                    input: data!,
                },
            });
            if (result.data) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log("ERRRO", error)
            return false;
        }
    };



    return {
        onCreate,
        onVerify,
        loading,
        error,
    };
}
