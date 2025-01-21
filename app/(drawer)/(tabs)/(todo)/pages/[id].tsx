import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { MaterialIcons, FontAwesome5, AntDesign, Entypo } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ConfirmModal } from "@/components/Modal";
import { uploadImage } from "@/utils/cloudinary";
import { EditUserForm, User } from "@/types";
import { getUser, updateUser, deleteUser } from "@/hooks/useUser";
import { getTask } from "@/hooks/useTask";

export default function Index() {
    const navigate = useRouter();
    const { colors } = useThemeContext();
    const { id } = useLocalSearchParams();
    const { task } = getTask(id as string);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <View style={styles.innerContainer}>
                <View style={styles.dateHeader}>
                    <MaterialIcons
                        name="calendar-month"
                        size={30}
                        color={colors.primaryTextColor}
                        style={{
                            width: 50
                        }}
                    />
                    <Text style={[styles.dateText, {
                        color: colors.primaryTextColor
                    }]}>
                        26-01-2024 (Thursday)
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.title, { color: colors.primaryTextColor }]}>
                        {task?.title}
                    </Text>
                </View>
                {(task?.fromTime || task?.toTime) && (
                    <View style={styles.infoContainer}>
                        <View style={{
                            flexDirection: 'row',
                            marginRight: 20,
                        }}>
                            <AntDesign
                                name="clockcircle"
                                size={15}
                                color={colors.primaryTextColor}
                            />
                            <Text style={[styles.time, { color: colors.primaryTextColor }]}>
                                {task?.fromTime}
                            </Text>
                        </View>
                        <Entypo
                            name="arrow-right"
                            size={24}
                            color={colors.primaryTextColor}
                        />
                        <View style={{
                            flexDirection: 'row',
                            marginLeft: 20
                        }}>
                            <AntDesign
                                name="clockcircle"
                                size={15}
                                color={colors.primaryTextColor}
                            />
                            <Text style={[styles.time, { color: colors.primaryTextColor }]}>
                                {task?.toTime}
                            </Text>
                        </View>
                    </View>
                )}
                {task?.description && (
                    <View style={styles.infoContainer}>
                        <Text style={[styles.description, { color: colors.primaryTextColor }]}>
                            {task?.description}
                        </Text>
                    </View>
                )}

                <View style={styles.infoContainer}>
                    <Text style={[styles.switchLabel, {
                        color: colors.primaryTextColor
                    }]}>
                        Active
                    </Text>
                    <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity
                        onPress={() => console.log("HELLO")}
                        style={{ marginHorizontal: 15 }}
                    >
                        <FontAwesome5
                            name="edit"
                            size={24}
                            color={colors.primaryTextColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log("HELLO")}
                        style={{ marginHorizontal: 15 }}
                    >
                        <MaterialIcons
                            name="delete"
                            size={28}
                            color={colors.danger}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    innerContainer: {
        width: '90%',
        marginHorizontal: 'auto'
    },
    dateHeader: {
        flexDirection: 'row',
        paddingVertical: 20
    },
    dateText: {
        fontSize: 23,
        width: 400,
        fontWeight: 'bold'
    },
    infoContainer: {
        width: "100%",
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        boxShadow: '0 4 8 0 rgba(0, 0, 0, 0.2)',
        padding: 20,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '500'
    },
    description: {
        fontSize: 14,
    },
    time: {
        fontSize: 15,
        marginLeft: 10
    },
    btnContainer: {
        width: "75%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginVertical: 50,
    },
    switchLabel: {
        fontSize: 17,
        fontWeight: 'bold',
        marginHorizontal: 10
    }
});
