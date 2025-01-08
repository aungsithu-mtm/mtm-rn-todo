import { useContext, useState } from "react";
import { Text, View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { CustomTextInput } from "@/components/form"

export default function Index() {
    const { colors } = useContext(ThemeContext);
    const [text, onChangeText] = useState("HELLO");
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <View
                style={{
                    backgroundColor: colors.primary,
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CustomTextInput
                    handleChange={onChangeText}
                    handleBlur={() => {
                        console.log("BLUE")
                    }}
                    value={text}
                    name="Test"
                />
            </View>
        </KeyboardAvoidingView>
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
