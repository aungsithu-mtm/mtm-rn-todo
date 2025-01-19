import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FormModal } from "@/components/Modal";
import UserEditForm from "../components/UserEditForm";
import { uploadImage } from "@/utils/cloudinary";
import { EditUserForm } from "@/types";
import { getUser, updateUser } from "@/hooks/useUser";

export default function Index() {
    const { colors } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useLocalSearchParams();
    const { user } = getUser(id as string)
    const { setUser } = updateUser();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const initialValue: EditUserForm = {
            _id: user?._id || '',
            firstName: user?.firstName,
            lastName:  user?.lastName,
            username: user?.username || '',
            email:  user?.email || '',
            address: user?.address,
            phone: user?.phone,
            imageUrl:  user?.imageUrl,
            publicId:  user?.publicId ,
        };

        const handleEdit = async (data: EditUserForm) => {
            setIsLoading(true);
            try {
                if (profileImage) {
                    await uploadImage(profileImage).then((img) => {
                        data = {
                            ...data,
                            publicId: img.public_id,
                            imageUrl: img.url,
                        };
                    });
                }
                setUser(data);
                setProfileImage(null);
                setIsOpen(false);
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        }

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <View style={styles.headerContent}>
                {user?.imageUrl ? (
                    <Image source={{ uri: user.imageUrl }} style={styles.profileImage}
                    />
                ) : (
                    <Image source={require("@/assets/images/defaultProfile.png")} style={styles.profileImage} />
                )}

                <View style={styles.headerText}>
                    <Text style={[styles.userName, { color: colors.primaryTextColor }]}>
                        {user?.username}
                    </Text>
                    <Text style={[styles.userEmail, { color: colors.primaryTextColor }]}>
                        {user?.email}
                    </Text>
                </View>
            </View>
            <View style={{marginTop: 25}}>
                {user?.username && (
                    <View style={styles.infoContainer}>
                        <MaterialIcons
                        name="person"
                        size={20}
                        color={colors.primaryTextColor}/>
                        <Text style={[{color: colors.primaryTextColor}, styles.infoText]}>
                            {user.username}
                        </Text>
                    </View>
                )}
                {user?.email && (
                    <View style={styles.infoContainer}>
                        <MaterialIcons
                        name="person"
                        size={20}
                        color={colors.primaryTextColor}/>
                        <Text style={[{color: colors.primaryTextColor}, styles.infoText]}>
                            {user.email}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    onPress={() => setIsOpen(true)}
                    style={{marginHorizontal: 15}}
                >
                    <FontAwesome5 
                        name="user-edit" 
                        size={24} 
                        color={colors.primaryTextColor} 
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setIsOpen(true)}
                    style={{marginHorizontal: 15}}
                >
                  <MaterialIcons 
                        name="delete" 
                        size={28} 
                        color={colors.danger} 
                  />
                </TouchableOpacity>
                </View>
                {user && (
                    <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                    <UserEditForm
                        handleForm={(data) => handleEdit(data)}
                        initialValue={initialValue}
                        setIsOpen={setIsOpen}
                        loading={isLoading}
                        setProfileImage={setProfileImage}
                    />
                    </FormModal>
                )}
               
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
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
    infoContainer: {
        flexDirection:"row",
        width: "80%",
        marginHorizontal: 'auto',
        marginTop: 15,
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,  
        // elevation: 5,
        boxShadow: '0 4 8 0 rgba(0, 0, 0, 0.2)',
        padding: 15,
        borderRadius: 10
    },
    infoText: {
        marginLeft: 20,
        fontWeight: 'bold'
    },

    btnContainer: {
        width: "75%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginVertical: 50,
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
