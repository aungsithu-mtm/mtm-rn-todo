import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import { useThemeContext } from "@/context/ThemeContext";

type CustomHamburgerProps = {
  navigation: any;
  color: string;
};

type CustomDrawerContentProps = {
  props: any;
};

const CustomHamburger: React.FC<CustomHamburgerProps> = ({ navigation, color }) => (
  <TouchableOpacity style={styles.menuButton} onPress={navigation.toggleDrawer}>
    <Ionicons name="menu" size={24} color={color} />
  </TouchableOpacity>
);

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const renderDrawerItem = (
    iconName: string,
    label: string,
    path: any,
    IconComponent: React.ComponentType<any>
  ) => (
    <DrawerItem
      icon={({ size }) => (
        <IconComponent
          name={iconName}
          size={size}
          color={pathname === path ? "#fff" : "#000"}
        />
      )}
      label={label}
      labelStyle={[
        styles.navItemLabel,
        { color: pathname === path ? "#fff" : "#000" },
      ]}
      style={{ backgroundColor: pathname === path ? "#333" : "#fff" }}
      onPress={() => router.push(path)}
    />
  );

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          style={styles.userImg}
        />
        <TouchableWithoutFeedback
          onPress={() => router.push("/(drawer)/(profile)/pages")}
        >
          <View style={styles.userDetailsWrapper}>
            <Text style={styles.userName}>Aung Si Thu</Text>
            <Text style={styles.userEmail}>aungsith@gmail.com</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {renderDrawerItem(
        "list", 
        "Todo", 
        "/(drawer)/(tabs)/(todo)/pages", 
        MaterialIcons
        )}
      {renderDrawerItem(
        "settings-outline",
        "Settings",
        "/(drawer)/(setting)/pages",
        Ionicons
      )}
    </DrawerContentScrollView>
  );
};

const Layout: React.FC = () => {
  const { colors } = useThemeContext();

  const screenOptions = (navigation: any, title: string) => ({
    headerTitle: title,
    headerShown: true,
    headerTitleAlign: "center" as const,
    headerStyle: { backgroundColor: colors.barColor },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "bold" as const,
      color: colors.tabTextColor,
    },
    headerLeft: () => (
      <CustomHamburger color={colors.primaryTextColor} navigation={navigation} />
    ),
  });

  return (
    <Drawer drawerContent={(props: any) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="(tabs)" options={{ headerShown: false }} />
      <Drawer.Screen
        name="(profile)"
        options={({ navigation }) => screenOptions(navigation, "Profile")}
      />
      <Drawer.Screen
        name="(setting)"
        options={({ navigation }) => screenOptions(navigation, "Setting")}
      />
    </Drawer>
  );
};

export default Layout;

const styles = StyleSheet.create({
  navItemLabel: {
    marginLeft: 20,
    fontSize: 18,
  },
  userInfoWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  menuButton: {
    marginLeft: 15,
  },
});
