import React, { useState, useEffect } from "react";
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Platform
} from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons"; 

type Props = {
    handleChange: (text: string) => void;
    handleBlur: (e: any) => void;
    mode: "date" | "time";
    value: string;
    name: string;
    errors?: string;
    touched?: boolean;
    label?: string;
    [key: string]: any;
};

export function DateTimeInput({
    handleChange,
    handleBlur,
    value,
    errors,
    mode,
    touched,
    label,
    ...props
}: Props) {
    const { colors } = useThemeContext();
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (value) {
            const parsedDate = new Date(value);
            if (!isNaN(parsedDate.getTime())) {
                setDate(parsedDate);
            }
        }
    }, [value]);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(new Date(selectedDate));

            if (mode === "date") {
                const formattedDate = selectedDate.toISOString().split("T")[0];
                handleChange(formattedDate);
            } else if (mode === "time") {
                const hours = selectedDate.getHours().toString().padStart(2, "0");
                const minutes = selectedDate.getMinutes().toString().padStart(2, "0");
                const formattedTime = `${hours}:${minutes}`;
                handleChange(formattedTime);
            }
        }
    };

    return (
        <View>
            {label && (
                <View style={styles.labelContainer}>
                    <Text
                        style={[
                            styles.label,
                            { color: props.color ? props.color : colors.primaryTextColor },
                        ]}
                    >
                        {label}
                    </Text>
                </View>
            )}
            <TouchableOpacity style={[styles.textInputContainer]} onPress={() => setShow(true)}>
                <TextInput
                    style={[
                        styles.textInput,
                        {
                            borderColor: props.color ? props.color : colors.secondaryBgColor,
                            paddingLeft: 40,
                        },
                    ]}
                    placeholderTextColor={colors.primary}
                    autoCapitalize="none"
                    onBlur={handleBlur}
                    editable={false}
                    value={value}
                    {...props}
                />

                <MaterialIcons
                    name={mode === "date" ? "calendar-month" : "access-time"}
                    size={20}
                    color={props.color ? props.color : colors.primaryTextColor}
                    style={styles.icon}
                />
            </TouchableOpacity>
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
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    textInputContainer: {
        position: "relative",
        width: "100%",
    },
    textInput: {
        padding: 15,
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#1A2130",
        borderRadius: 21,
    },
    labelContainer: {
        flexDirection: "row",
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
});
