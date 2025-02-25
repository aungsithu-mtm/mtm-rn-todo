import React, { useContext } from "react";
import { Tabs, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import { useNavigationState } from '@react-navigation/native';
import { useThemeContext } from "@/context/ThemeContext";
import { DrawerToggleButton } from "@react-navigation/drawer";

const _layout = () => {
    const { colors } = useThemeContext();
    const navigationState = useNavigationState((state) => state);
    const navigate = useRouter();

    const getNestedRouteName = (state: any): string | null => {
        if (!state) return null;
        const route = state.routes[state.index];
        if (route.state) {
            return getNestedRouteName(route.state);
        }
        return route.name;
    };

    const currentRouteName = getNestedRouteName(navigationState);
    const hideTabBarScreens = ['[id]', 'create', 'edit'];
    const isSpecificScreens = hideTabBarScreens.includes(currentRouteName ? currentRouteName : '');

    const getCustomTitle = (routeName: string | null): string | undefined => {
        switch (routeName) {
            case '[id]':
                return "Detail";
            case 'create':
                return "Create";
            case 'edit':
                return "Edit";
            default:
                return undefined;
        }
    };

    const Customtitle = getCustomTitle(currentRouteName);

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
        tabBarActiveTintColor: colors.tabTextTintColor,
        tabBarInactiveTintColor: colors.tabTextColor,
        title: Customtitle || title,
        headerTitleAlign: "center" as const,
        headerStyle: {
            backgroundColor: colors.primaryBgColor,
        },
        headerTitleStyle: {
            fontSize: 18,
            fontWeight: "bold" as const,
            color: colors.tabTextColor,
        },
        headerLeft: () => (
            isSpecificScreens
                ? <TouchableOpacity onPress={() => navigate.back()} style={{ marginLeft: 20 }}>
                    {Platform.OS === "ios"
                        ? (<MaterialIcons name="arrow-back-ios-new" size={24} color={colors.primaryTextColor} />)
                        : (<MaterialIcons name="arrow-back" size={24} color={colors.primaryTextColor} />)}
                </TouchableOpacity>
                : <DrawerToggleButton tintColor={colors.primaryTextColor} />
        ),
    });

    return (
        <Tabs
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: colors.barColor,
                    display: isSpecificScreens ? 'none' : 'flex',
                }
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
