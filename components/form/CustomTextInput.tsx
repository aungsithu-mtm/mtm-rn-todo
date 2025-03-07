import React, { useState } from "react";
import { TextInput, StyleSheet, TouchableOpacity, View, KeyboardTypeOptions, Text } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";


type Props = {
    handleChange: (text: string) => void;
    handleBlur: (e: any) => void;
    errors?: string;
    touched?: boolean;
    value: string;
    name: string;
    type?: KeyboardTypeOptions | undefined;
    icon?: keyof typeof MaterialIcons.glyphMap;
    [key: string]: any;
    label?: string
    editable?: boolean
    isPassword?: boolean
};

export function CustomTextInput({
    handleChange,
    handleBlur,
    name,
    value,
    errors,
    touched,
    type = "default",
    icon,
    label,
    isPassword = false,
    editable = true,
    ...props
}: Props) {
    const { colors } = useThemeContext();
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const inputHeight = props.numberOfLines && (props.numberOfLines * 25)

    return (
        <>
            {label && (
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, {
                        color: props.color ? props.color : colors.primaryTextColor
                    }]}>{label}</Text>
                </View>
            )}
            <View style={[styles.textInputContainer]}>
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            borderColor: props.color ? props.color : colors.secondaryBgColor,
                            paddingLeft: icon ? 40 : 15,
                            height: inputHeight
                        },
                    ]}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    placeholderTextColor={props.color ? props.color : colors.primaryTextColor}
                    autoCapitalize="none"
                    onChangeText={handleChange}
                    onBlur={handleBlur}
                    keyboardType={type}
                    value={value}
                    editable={editable}
                    {...props}
                />
                {icon && (
                    <MaterialIcons
                        name={icon}
                        size={20}
                        color={props.color ? props.color : colors.primaryTextColor}
                        style={styles.icon}
                    />
                )}

                {isPassword && (
                    <TouchableOpacity
                        style={styles.visible}
                        onPress={() => setPasswordVisible(!isPasswordVisible)}
                    >
                        <MaterialIcons
                            name={isPasswordVisible ? "visibility" : "visibility-off"}
                            size={20}
                            color={props.color ? props.color : colors.primaryTextColor}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {errors && touched && (
                <Text
                    style={{
                        color: colors.danger,
                        fontSize: 12,
                        paddingTop: 5,
                    }}
                >
                    {errors}
                </Text>
            )}
        </>

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
    labelContainer: {
        flexDirection: 'row',
        marginLeft: 5,
    },
    label: {
        marginLeft: 7,
        fontSize: 14,
        paddingBottom: 6,
    },
    icon: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: [{ translateY: -10 }],
    },
    textInputContainer: {
        position: "relative",
        width: "100%"
    },
    visible: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: [{ translateY: -10 }],
    },
});
