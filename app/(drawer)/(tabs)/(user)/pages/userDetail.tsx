import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import FormModal from "@/components/FormModal";
import UserEditForm from "../components/UserEditForm";
import { AddUserForm } from "@/types";

const Button = ({ onPress, style, icon, label, labelColor }: any) => (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
        {icon}
        <Text style={[styles.btnLabel, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
);

export default function Index() {
    const { colors } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const { userName = "Unknown User", userEmail = "No Email", userImage } = useLocalSearchParams();
    const navigate = useRouter();

    const initialValue: AddUserForm = {
        username: "aungthu",
        email: "aungthu@gmail.com",
        password: "",
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <View style={styles.headerContent}>
                <Image
                    source={{
                        uri: userImage,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.headerText}>
                    <Text style={[styles.userName, { color: colors.primaryTextColor }]}>
                        {userName}
                    </Text>
                    <Text style={[styles.userEmail, { color: colors.primaryTextColor }]}>
                        {userEmail}
                    </Text>
                </View>
            </View>
            <View style={styles.btnContainer}>
                <Button
                    onPress={() => setIsOpen(true)}
                    style={{ backgroundColor: colors.primary }}
                    icon={
                        <MaterialIcons name="edit" size={24} color={colors.primaryTextColor} />
                    }
                    label="Edit"
                    labelColor={colors.primaryTextColor}
                />
                <Button
                    onPress={() => navigate.push("../")}
                    style={{ backgroundColor: colors.primaryBgColor2 }}
                    label="Back To List"
                    labelColor={colors.primaryTextColor}
                />
                <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <UserEditForm
                        handleForm={(data) => console.log("Data", data)}
                        initialValue={initialValue}
                        setIsOpen={setIsOpen}
                    />
                </FormModal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 20,
    },
    headerContent: {
        alignItems: "center",
    },
    headerText: {
        marginTop: 10,
        alignItems: "center",
    },
    userName: {
        fontSize: 24,
        fontWeight: "bold",
    },
    userEmail: {
        fontSize: 14,
    },
    btnContainer: {
        width: "80%",
        alignSelf: "center",
        marginVertical: 20,
    },
    btn: {
        flexDirection: "row",
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    btnLabel: {
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
});
