import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

export default function Index() {
    const { colors } = useThemeContext();

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.primaryBgColor
            }}
        >
            <Text style={{ color: colors.primaryTextColor }}>SETTING SCREEN</Text>
        </View>
    );
}
