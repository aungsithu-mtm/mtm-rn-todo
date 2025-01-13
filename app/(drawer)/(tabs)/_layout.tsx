import React, { useContext } from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";
import { DrawerToggleButton } from "@react-navigation/drawer";

const _layout = () => {

    const { colors } = useThemeContext();
    const getScreenOptions = (
        icon: keyof typeof MaterialIcons.glyphMap,
        title: string
    ) => ({
        tabBarIcon: ({ focused }: { focused: boolean }) => (
            <MaterialIcons
                name={icon}
                size={24}
                color={focused ? colors.tabTextTintColor : colors.tabTextColor}
            />
        ),
        title,
        tabBarActiveTintColor: colors.tabTextTintColor,
        tabBarInactiveTintColor: colors.tabTextColor,
        headerTitleAlign: "center" as const,
        headerStyle: {
            backgroundColor: colors.barColor,
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold" as const,
            color: colors.tabTextColor,
        },
        headerLeft: () => (
            <DrawerToggleButton tintColor={colors.primaryTextColor} />
        ),
    });

    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: colors.barColor,
                },
            }}
        >
            <Tabs.Screen
                name="(todo)"
                options={getScreenOptions("home", "Overview")}
            />
            <Tabs.Screen
                name="(upcoming)"
                options={getScreenOptions("calendar-today", "Upcoming")}
            />
            <Tabs.Screen
                name="(user)"
                options={getScreenOptions("group", "User")}
            />
        </Tabs >
    );
};

const styles = StyleSheet.create({
    menuButton: {
        marginLeft: 15,
        padding: 10,
    },
});

export default _layout;
