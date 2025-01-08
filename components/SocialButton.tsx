import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    View,
    Dimensions
} from 'react-native'
import React, {
    useCallback,
    useEffect,
    useState,
    useContext
} from 'react'
import { ThemeContext } from '@/context/ThemeContext'
import { SocialType } from '@/enums/common'
import { useOAuth, useUser } from '@clerk/clerk-expo'
import type { OAuthStrategy } from '@clerk/types'
import * as WebBrowser from "expo-web-browser"
import * as Linking from "expo-linking";
import { useRouter } from 'expo-router'

type Props = {
    socialType: SocialType
};

const { colors } = useContext(ThemeContext)

export const useWarnUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        }
    }, [])
};

WebBrowser.maybeCompleteAuthSession();

const SocialBtn: React.FC<Props> = ({ socialType }) => {
    useWarnUpBrowser();
    const [isLoading, setIsLoading] = useState(false);
    const [btnText, setBtnText] = useState("");
    const { user } = useUser();
    const navigate = useRouter();

    const getStrategy = () => {
        if (socialType === SocialType.Google) {
            return "oauth_google";
        } else if (socialType === SocialType.Facebook) {
            return "oauth_facebook";
        }
    };

    const { startOAuthFlow } = useOAuth({
        strategy: getStrategy() as OAuthStrategy
    })

    useEffect(() => {
        if (socialType === SocialType.Google) {
            setBtnText("Google");
        } else if (socialType === SocialType.Facebook) {
            setBtnText("Facebook");
        }
    }, []);

    const getImageSource = () => {
        switch (socialType) {
            case SocialType.Google:
                return require("../assets/images/google-logo-icon.png");
            case SocialType.Facebook:
                return require("../assets/images/facebook-logo-icon.png");
            default:
                return require("../assets/images/google-logo-icon.png");
        }
    };

    const socialLogin = useCallback(async () => {
        try {
            setIsLoading(true);
            const { createdSessionId, setActive } = await startOAuthFlow({
                redirectUrl: Linking.createURL("/dashboard", {
                    scheme: "myapp"
                })
            })

            if (createdSessionId) {
                console.log("Session Created");
                setActive!({
                    session: createdSessionId
                })
                navigate.replace("/(tabs)/(todo)/pages");
                await user?.reload();
            } else {
                console.log("Session not created");
            }
        } catch (err) {
            console.log(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }, [])

    return (
        <View>
            <TouchableOpacity
                style={styles.socialBtn}
                onPress={socialLogin}
                disabled={isLoading}
            >
                <Image source={getImageSource()} style={styles.icon} />
                <Text style={styles.socialBtnTxt}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SocialBtn;

const styles = StyleSheet.create({
    socialBtn: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        width: Dimensions.get("screen").width / 2.4,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10,
        display: "flex",
    },
    socialBtnTxt: {
        color: colors.black,
        fontWeight: "600",
    },
});