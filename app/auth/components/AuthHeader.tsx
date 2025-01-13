import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ThemeContext, useThemeContext } from "@/context/ThemeContext";
import { ModalType } from '@/enums/common';

type Props = {
    mode: ModalType;
}

export default function AuthHeader({ mode }: Props) {
    const { colors, theme } = useThemeContext()
    const content = {
        title: "Welcome Back!",
        description: `Please login to continue\nmanaging your plan`
    }

    switch (mode) {
        case ModalType.SignUp:
            content.title = "Register!";
            content.description = "Please register to continue\nmanaging your plan";
            break;
        case ModalType.VerifyEmail:
            content.title = "Verify Email!";
            content.description = "Please fill your code\nwe send to your email";
            break;
        case ModalType.forgotPassword:
            content.title = "Forgot Password!";
            content.description = "Don't worry,\nwe will saved you";
        default: break;
    }
    return (
        <View style={style.headingContainer}>
            <Image
                source={
                    theme.mode === 'dark'
                        ? require('../../../assets/images/dark-todo-logo.png')
                        : require('../../../assets/images/todo-logo.png')
                }
                style={
                    style.headerLogo
                }
            />
            <View style={[style.headerTextContainer]}>
                <Text style={[style.headerTitle, { color: colors.primaryTextColor }]}>
                    {content.title}
                </Text>
                <Text style={[style.headerDescription, { color: colors.primaryTextColor }]}>
                    {content.description}
                </Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 35,
    },
    headerLogo: {
        width: 100,
        height: 100
    },
    headerTextContainer: {
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerDescription: {
        fontSize: 14,
        fontWeight: '600',
    },
})