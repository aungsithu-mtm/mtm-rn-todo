import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons, Ionicons } from "@expo/vector-icons"
import { TouchableOpacity, StyleSheet, View, TouchableHighlight } from "react-native";

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tabs.Screen
                name="(todo)"
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="home"
                            size={24}
                            color="#FFEEFF"
                        />
                    ),
                    title: "Overview",
                    tabBarActiveTintColor: "#EEFFEE",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: 'red',
                    },
                    headerTitleStyle: {
                        fontSize: 18,
                        fontWeight: "bold",
                        color: "#000", // Customize header text color
                    },
                    headerLeft: () => (
                        <TouchableHighlight
                            style={styles.menuButton}
                            onPress={() => {
                                console.log("Menu button pressed!");
                            }}
                            underlayColor="#ccc"
                        >
                            <Ionicons name="menu" size={28} color="#000" />
                        </TouchableHighlight>
                    ),
                }}
            />

            <Tabs.Screen
                name="(upcoming)"
                options={{
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="home"
                            size={24}
                            color="#FFEEFF"
                        />
                    ),
                    title: "Upcoming",
                    tabBarActiveTintColor: "#EEFFEE"
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    tabBarButton: (props) => (
                        <View style={styles.customButtonContainer}>
                            <TouchableHighlight
                                style={styles.customButton}
                                onPress={props.onPress}
                                underlayColor="#a30714"
                            >
                                <Ionicons name="add" size={28} color="white" />
                            </TouchableHighlight>
                        </View>
                    ),
                    title: "Index",
                    tabBarActiveTintColor: "#EEFFEE"
                }}
            />
            <Tabs.Screen
                name="(user)"
                options={{
                    // headerShown: false,
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="home"
                            size={24}
                            color="#FFEEFF"
                        />
                    ),
                    title: "User",
                    tabBarActiveTintColor: "#EEFFEE"
                }}
            />
            <Tabs.Screen
                name="(profile)"
                options={{
                    // headerShown: false,
                    tabBarIcon: () => (
                        <MaterialIcons
                            name="home"
                            size={24}
                            color="#FFEEFF"
                        />
                    ),
                    title: "Profile",
                    tabBarActiveTintColor: "#EEFFEE"
                }}
            />

        </Tabs >
    )
}



const styles = StyleSheet.create({
    customButtonContainer: {
        top: -30,
        justifyContent: "center",
        alignItems: "center",
    },
    customButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "dodgerblue",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    menuButton: {
        marginLeft: 15, // Adjust the position of the menu button
        padding: 10,
    },
});

export default _layout