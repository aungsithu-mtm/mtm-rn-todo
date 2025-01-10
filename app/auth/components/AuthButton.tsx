import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import React, { useContext } from 'react'
import { ThemeContext } from "@/context/ThemeContext";
import { ModalType } from '@/enums/common';

type Props = {
    mode?: ModalType;
    handleSubmit?: () => void;
    loading: boolean;
    color?: string;
    type: 'fill' | 'outline';
}

export default function AuthButton({ mode, handleSubmit, loading, color, type }: Props) {
    const { colors, theme } = useContext(ThemeContext)
    let buttonText = 'Click';

    switch (mode) {
        case ModalType.Signin:
            buttonText = 'Sign In';
            break;
        case ModalType.SignUp:
            buttonText = 'Sign Up';
            break;
        case ModalType.VerifyEmail:
            buttonText = 'Verify Code';
            break;
        case ModalType.forgotPassword:
            buttonText = 'Send Code';
            break;
        default: break;
    }
    return (
        <View>
            <TouchableOpacity
                style={[style.btnFill, { backgroundColor: colors.dark }]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={colors.light} />
                ) : (
                    <Text style={{ textAlign: "center", color: colors.light, fontWeight: 600 }}>
                        Verify Code
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    btnFill: {
        paddingVertical: 18,
        borderRadius: 21,
        marginVertical: 12,
        width: "100%",
    },
})