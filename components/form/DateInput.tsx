import React, { useState } from "react";
import {
    TextInput,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

type Props = {
    handleChange: (text: string) => void;
    handleBlur: () => void;
    mode: "date";
    value: string;
    name: string;
};

export function CustomDateInput({
    handleChange,
    handleBlur,
    value,
    ...props
}: Props) {
    const { colors } = useThemeContext();
    const [date, setDate] = useState<Date>(value ? new Date(value) : new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            const formattedDate = selectedDate.toISOString().split("T")[0];
            handleChange(formattedDate);
        }
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                    style={[
                        styles.textInput,
                        { borderColor: colors.primary },
                    ]}
                    placeholder="Select a date"
                    placeholderTextColor={colors.primary}
                    autoCapitalize="none"
                    onBlur={handleBlur}
                    editable={false}
                    value={date.toISOString().split("T")[0]}
                    {...props}
                />
            </TouchableOpacity>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                />
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
        borderRadius: 8,
        backgroundColor: "#FFF", // Ensure the input has a visible background
    },
});
