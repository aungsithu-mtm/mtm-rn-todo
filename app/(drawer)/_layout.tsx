import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
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
import { useAuthContext } from "@/context/AuthContext";


type CustomHamburgerProps = {
  navigation: any;
  color: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean
};

type CustomDrawerContentProps = {
  props: any;
  isOpen: boolean;
};

type DrawerUser = {
  username: string,
  email: string,
  imageUrl: string | null
}

const CustomHamburger: React.FC<CustomHamburgerProps> = ({ navigation, color, setIsOpen, isOpen }) => {
  const handlePress = () => {
    setIsOpen(!isOpen);
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity style={styles.menuButton} onPress={handlePress}>
      <Ionicons name="menu" size={24} color={color} />
    </TouchableOpacity>
  );
};

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const DefaultUser: DrawerUser = {
    username: "mgmg",
    email: "mgmg@gmail.com",
    imageUrl: ""
  }
  const pathname = usePathname();
  const [data, setData] = useState<DrawerUser>();
  const { refetchProfile } = useAuthContext();
  const { colors } = useThemeContext();

  useEffect(() => {
    (async () => {
      const data = await refetchProfile();
      if (data) {
        const {
          username,
          email,
          imageUrl } = data.data.userProfile;
        const user: DrawerUser = { username, email, imageUrl };
        setData(user);
      } else {
        setData(DefaultUser);
      }
    })();
  }, [props.isOpen]);

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
          color={pathname === path ? colors.primaryTextColor : colors.primaryTextColor}
        />
      )}
      label={label}
      labelStyle={[
        styles.navItemLabel,
        { color: colors.primaryTextColor },
      ]}
      style={{ marginVertical: 5 }}
      onPress={() => router.push(path)}
    />
  );

  return (
    <View style={[styles.drawerContainer, { backgroundColor: colors.barColor }]}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoWrapper}>
          {data?.imageUrl ? (
            <Image
              source={{ uri: data.imageUrl }}
              style={styles.userImg}
            />
          ) : (
            <Image
              source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
              style={styles.userImg}
            />
          )}

          <TouchableWithoutFeedback
            onPress={() => router.push("/(drawer)/(profile)/pages")}
          >
            <View style={styles.userDetailsWrapper}>
              <Text style={[styles.userName, { color: colors.primaryTextColor }]}>{data?.username}</Text>
              <Text style={[styles.userEmail, { color: colors.primaryTextColor }]}>{data?.email}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {
          renderDrawerItem(
            "list",
            "Todo",
            "/(drawer)/(tabs)/(todo)",
            MaterialIcons
          )
        }
        {
          renderDrawerItem(
            "settings-outline",
            "Settings",
            "/(drawer)/(setting)/pages",
            Ionicons
          )
        }
      </DrawerContentScrollView >
    </View >
  );
};

const Layout: React.FC = () => {
  const { colors } = useThemeContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const screenOptions = (navigation: any, title: string) => ({
    headerTitle: title,
    headerShown: true,
    headerTitleAlign: "center" as const,
    headerStyle: { backgroundColor: colors.primaryBgColor },
    headerTitleStyle: {
      fontSize: 18,
      fontWeight: "bold" as const,
      color: colors.tabTextColor,
    },
    headerLeft: () => (
      <CustomHamburger
        color={colors.primaryTextColor}
        navigation={navigation}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
      />
    ),
  });

  return (
    <Drawer drawerContent={(props: any) => <CustomDrawerContent isOpen={isOpen} {...props} />}>
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
  drawerContainer: {
    flex: 1,
  },
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
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  userDetailsWrapper: {
    marginTop: 5,
    marginLeft: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 12,
  },
  menuButton: {
    marginLeft: 15,
  },
});
