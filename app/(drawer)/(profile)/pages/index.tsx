import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuthContext } from "@/context/AuthContext";

const { width } = Dimensions.get("window");

type UserBasicInfo = {
    username: string,
    email: string,
}


export default function Index() {
    const { colors } = useThemeContext();
    const { onLogout } = useAuthContext();


    const DefaultUser: UserBasicInfo = {
        username: "mgmg",
        email: "mgmg@gmail.com"
    }
    const [data, setData] = useState<UserBasicInfo>();
    const { refetchProfile } = useAuthContext();

    useEffect(() => {
        (async () => {
            const data = await refetchProfile();
            if (data) {

                const { username, email } = data.data.userProfile;
                const user: UserBasicInfo = { username, email };
                setData(user);
            } else {
                setData(DefaultUser);
            }
        })();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <View style={styles.background}>
                <Image
                    source={require("../../../../assets/images/profileBg.png")}
                    style={styles.backgroundImage}
                />
                <View style={styles.headerContent}>
                    <Image
                        source={require('../../../../assets/images/user1.jpg')}
                        style={styles.profileImage}
                    />
                    <View style={styles.headerText}>
                        <Text style={[styles.userName, { color: colors.dark }]}>
                            {data?.username}
                        </Text>
                        <Text style={[styles.userEmail, { color: colors.dark }]}>
                            {data?.email}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => console.log("Delete Account")}>
                    <View style={[styles.btnFill, { backgroundColor: colors.danger }]}>
                        <MaterialIcons name="delete" color={colors.light} style={styles.icon} />
                        <Text style={[styles.btnText, { color: colors.light }]}>Delete Account</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={async () => await onLogout!()}>
                    <View style={[styles.btnOutline, { borderColor: colors.secondaryBgColor }]}>
                        <MaterialIcons name="logout" color={colors.danger} style={styles.icon} />
                        <Text style={[styles.btnText, { color: colors.danger }]}>Logout</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        position: "absolute",
        left: 0,
        top: 0,
        width: width,
        height: 300,
        resizeMode: "cover",
    },
    background: {
        position: "relative",
        height: 300,
    },
    profileImage: {
        width: 125,
        height: 125,
        borderRadius: 20,
    },
    headerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
    buttonContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    btnFill: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 18,
        borderRadius: 21,
        marginVertical: 12,
        width: "100%",
    },
    btnOutline: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        paddingVertical: 18,
        borderRadius: 21,
        marginVertical: 12,
        width: "100%",
    },
    btnText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8, // Space between icon and text
    },
    icon: {
        fontSize: 20,
    },
});
