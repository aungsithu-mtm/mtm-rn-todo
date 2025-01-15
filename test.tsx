import React from "react";
import { Button, View, Alert } from "react-native";
import { UserInput } from "@/domain/graphql/input/UserInput";
import UserRepository from "@/repositories/UserRepository";

export default function UserCreateScreen() {
    const { create, loading, error } = UserRepository();

    const handleCreateUser = async () => {
        const newUser: UserInput = {
            username: "john_doe",
            email: "john.doe@example.com",
            password: "securepassword123",
        };

        try {
            await create(newUser);
            Alert.alert("Success", "User created successfully!");
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Failed to create user. Please try again.");
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }
        }>
            <Button
                title={loading ? "Creating User..." : "Create User"}
                onPress={handleCreateUser}
                disabled={loading} // Disable the button while the mutation is loading
            />
            {error && (
                <Text style={{ color: "red", marginTop: 10 }}>
                    Error: {error.message}
                </Text>
            )}
        </View>
    );
}
