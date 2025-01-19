import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform, Text } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";


export default function Index() {
    const { colors } = useThemeContext();
    const [text, onChangeText] = useState("HELLO");
    return (

        <View
            style={{
                backgroundColor: colors.primaryBgColor,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
        </View>

    );
}

const style = StyleSheet.create({
    socialGroup: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    }
})
