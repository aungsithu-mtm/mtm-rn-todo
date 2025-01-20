import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeContext } from '@/context/ThemeContext';

type Props = {
    setSearchInput: Dispatch<SetStateAction<string>>;
};

export const SearchInput: React.FC<Props> = ({ setSearchInput }) => {
    const { colors } = useThemeContext();
    const [inputValue, setInputValue] = useState<string>("");

    const handleClearInput = () => {
        setInputValue("");
        setSearchInput("");
    };

    return (
        <View
            style={[
                styles.searchContainer,
                {
                    backgroundColor: colors.primaryBgColor,
                },
            ]}
        >
            <MaterialIcons name="search" size={24} color={colors.primaryTextColor} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Search"
                placeholderTextColor={colors.primaryTextColor}
                keyboardType="default"
                style={[styles.searchInput, { color: colors.primaryTextColor }]}
                value={inputValue}
                onChangeText={(text) => {
                    setInputValue(text);
                    setSearchInput(text);
                }}
            />
            {inputValue.length > 0 && (
                <TouchableOpacity onPress={handleClearInput}>
                    <MaterialIcons name="close" size={24} color={colors.primaryTextColor} />
                </TouchableOpacity>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomLeftRadius: 15,
        borderBottomEndRadius: 15,
        padding: 10,
        overflow: "hidden",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // shadowRadius: 2,
        boxShadow: '0 4 8 0 rgba(0, 0, 0, 0.2)',
        width: '95%',
        marginHorizontal: 'auto'
    },
    searchInput: {
        width: "77%",
        paddingRight: 10
    }
})

