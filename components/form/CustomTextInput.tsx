import React, {  useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, View, KeyboardTypeOptions } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    handleChange: (text: string) => void;
    handleBlur: (e: any) => void;
    value: string;
    name: string;
    type?: "password" | "email" | "number";
    [key: string]: any;
};

export function CustomTextInput({
    handleChange,
    handleBlur,
    name,
    value,
    type,
    ...props
}: Props) {
    const { colors } = useThemeContext();
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const isPassword = type === "password";
    let keyBoardType: KeyboardTypeOptions;
    switch (type) {
        case "email": keyBoardType = "email-address"; break;
        case "number": keyBoardType = "numeric"; break;
        default: keyBoardType = "default"
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    return (
        <View style={[isPassword ? styles.pwdContainer : "", { width: "100%" }]}>
            <TextInput
                style={[
                    styles.textInput,
                    { borderColor: props.color ? props.color : colors.secondaryBgColor },
                ]}
                secureTextEntry={isPassword && !isPasswordVisible}
                placeholderTextColor={props.color ? props.color : colors.primaryTextColor}
                autoCapitalize="none"
                onChangeText={handleChange}
                onBlur={handleBlur}
                keyboardType={keyBoardType}
                value={value}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity
                    style={styles.visible}
                    onPress={togglePasswordVisibility}
                >
                    <MaterialIcons
                        name={isPasswordVisible ? "visibility" : "visibility-off"}
                        size={20}
                        color={props.color ? props.color : colors.primaryTextColor}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    textInput: {
        padding: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#1A2130",
        borderRadius: 21,
        width: '100%'
    },
    pwdContainer: {
        position: "relative",
    },
    visible: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -10 }],
    },
});
