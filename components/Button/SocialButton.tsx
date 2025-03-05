import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeContext } from '@/context/ThemeContext'
import { SocialType } from '@/enums/common'
import { useOAuth } from '@clerk/clerk-expo'
import type { OAuthStrategy } from '@clerk/types'
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking";
import { useRouter } from 'expo-router'
import { useAuthContext } from "@/context/AuthContext";

type Props = {
    socialType: SocialType
};

// Hook to warm up the browser
export const useWarmUpBrowser = () => {
    useEffect(() => {
        WebBrowser.warmUpAsync();
        return () => {
            WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export const SocialBtn: React.FC<Props> = ({ socialType }) => {
    const navigation = useRouter();
    const { colors } = useThemeContext();
    useWarmUpBrowser();
    const [isLoading, setIsLoading] = useState(false);
    const [btnText, setBtnText] = useState("");
    const {onSocialLogin} = useAuthContext();

    const getStrategy = (): OAuthStrategy => {
        switch (socialType) {
            case SocialType.Google:
                return "oauth_google";
            case SocialType.Facebook:
                return "oauth_facebook";
            default:
                return "oauth_google"; // Default strategy
        }
    };

    const { startOAuthFlow } = useOAuth({ strategy: getStrategy() });

    useEffect(() => {
        if (socialType === SocialType.Google) {
            setBtnText("Google");
        } else if (socialType === SocialType.Facebook) {
            setBtnText("Facebook");
        }
    }, [socialType]);

    const getImageSource = () => {
        switch (socialType) {
            case SocialType.Google:
                return require("../../assets/images/google-logo-icon.png");
            case SocialType.Facebook:
                return require("../../assets/images/facebook-logo-icon.png");
            default:
                return require("../../assets/images/google-logo-icon.png");
        }
    };

    const socialLogin = async () => {
        setIsLoading(true);
        const response = await startOAuthFlow({
            redirectUrl: Linking.createURL("/dashboard", { scheme: "todo_frame" })
        });
        await onSocialLogin!(response).finally(() =>{
            setIsLoading(false);
             navigation.replace("/(drawer)/(tabs)/(todo)/pages");
        });
    }

    // const socialLogin = useCallback(async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await startOAuthFlow({
    //             redirectUrl: Linking.createURL("/dashboard", { scheme: "todo_frame" })
    //         });
    //         await onSocialLogin!(response).finally(() => setIsLoading(false));
            // const { createdSessionId, signUp, signIn } = response;
            // if (createdSessionId && signUp) {
            //     const result = await register({
            //         variables: {
            //             input: {
            //                 email: signUp.emailAddress!,
            //                 username: `${signUp.firstName ?? ""} ${signUp.lastName ?? ""}`.trim(),
            //                 password: "",
            //             },
            //         },
            //     });
            //     if (result.data) {
            //         // setTokenAsync(result.data.register.token);
            //         // await setActiveSignUp?.({ session: createdSessionId });
                    
            //         setTokenAsync(result.data.register.token);
            //         await setActiveSignUp?.({ session: createdSessionId });
            //         navigation.replace("/(drawer)/(tabs)/(todo)/pages");
            //     }
            // }
            // if(createdSessionId && signIn){
            //     setActive?.({ session: createdSessionId });
            // }
    //     } catch (err) {
    //         console.error("Error during social login:", err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [register, startOAuthFlow]);

    return (
        <View>
            <TouchableOpacity
                style={[styles.socialBtn, { shadowColor: colors.primary, backgroundColor: colors.primaryBgColor }]}
                onPress={socialLogin}
                disabled={isLoading}
            >
                <Image source={getImageSource()} style={styles.icon} />
                <Text style={[styles.socialBtnTxt, { color: colors.primaryTextColor }]}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    socialBtn: {
        borderRadius: 21,
        padding: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        width: Dimensions.get("screen").width / 3,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialBtnTxt: {
        fontWeight: "600",
    },
});
