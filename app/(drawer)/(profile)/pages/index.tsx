import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "@/utils/cloudinary";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuthContext } from "@/context/AuthContext";
import { FormModal, ConfirmModal } from "@/components/Modal";
import { User, UserChangePassword } from "@/types";
import ProfileEditForm from "../components/ProfileEditForm";
import PasswordChangeForm from "../components/PasswordChangeForm"

const { width } = Dimensions.get("window");

const defaultData: User = {
    _id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    isActive: true,
    publicId: "",
    imageUrl: null,
}

export default function Index() {
    const { colors } = useThemeContext();
    const [isOpen, setIsOpen] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isConfirm, setIsComfirm] = useState<boolean>(false);
    const [data, setData] = useState<User>(defaultData);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [initialValue, setInitialValue] = useState<User>(defaultData)
    const {
        refetchProfile,
        onProfileUpdate,
        onDeleteAccount,
        onLogout,
        onChangePassword
    } = useAuthContext();


    const refetch = async () => {
        const data = await refetchProfile();
        if (data) {
            const {
                _id,
                firstName,
                lastName,
                address,
                phone,
                email,
                username,
                isActive,
                imageUrl,
                publicId,
            } = data.data.userProfile;
            const user: User = {
                _id,
                firstName,
                lastName,
                email,
                address,
                phone,
                username,
                isActive,
                imageUrl,
                publicId,
            };
            setData(user);
            setInitialValue(user);
        }
    }

    useEffect(() => {
        refetch();
    }, [setIsOpen, setIsComfirm]);

    const handleEditProfile = async (data: User) => {
        setIsLoading(true);
        await onProfileUpdate(data).finally(() => {
            refetch();
            setIsOpen(false);
            setIsComfirm(false);
            setIsLoading(false)
        }
        );
    };

    const handleChangePassword = async (data: UserChangePassword | boolean) => {
        const pwdData = data as UserChangePassword;
        await onChangePassword!(pwdData.currentPassword!, pwdData.newPassword!).finally(() => {
            setIsChangePassword(false);
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setIsLoading(true);
            let base64Img = `data:image/jpg;base64,${result.assets[0].base64!}`;
            setProfileImage(base64Img);
            await uploadImage(base64Img).then((img) => {
                handleEditProfile({
                    ...data,
                    publicId: img.public_id,
                    imageUrl: img.url
                });
            });
            setIsLoading(true);
        };
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
            <View style={styles.background}>
                <Image
                    source={require("../../../../assets/images/profileBg.png")}
                    style={styles.backgroundImage}
                />
                <View style={styles.headerContent}>
                    <View style={styles.profileWrapper}>
                        {profileImage ? (
                            <Image
                                source={{ uri: profileImage }}
                                style={styles.profileImage}
                            />
                        ) : initialValue.imageUrl ? (
                            <Image
                                source={{ uri: initialValue.imageUrl }}
                                style={styles.profileImage}
                            />
                        ) : (
                            <Image
                                source={require("@/assets/images/defaultProfile.png")}
                                style={styles.profileImage}
                            />
                        )}

                        {isLoading ? (
                            <ActivityIndicator color={colors.dark} style={styles.cameraIcon} />
                        ) : (

                            <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
                                <MaterialIcons
                                    name="camera-alt"
                                    size={30}
                                    color={colors.primaryTextColor}
                                />
                            </TouchableOpacity>
                        )}
                    </View>

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
            <View style={{ marginTop: 25 }}>
                {(data.firstName || data.lastName) && (
                    <View style={styles.infoContainer}>
                        <MaterialIcons
                            name="person"
                            size={20}
                            color={colors.primaryTextColor} />
                        <Text style={[{ color: colors.primaryTextColor }, styles.infoText]}>
                            {data.firstName ? data.firstName : ""}
                            {" "}
                            {data.lastName ? data.lastName : ""}
                        </Text>
                    </View>
                )}

                {data.address && (
                    <View style={styles.infoContainer}>
                        <MaterialIcons
                            name="home"
                            size={20}
                            color={colors.primaryTextColor} />
                        <Text style={[{ color: colors.primaryTextColor }, styles.infoText]}>
                            {data.address}
                        </Text>
                    </View>
                )}
                {data.phone && (
                    <View style={styles.infoContainer}>
                        <MaterialIcons
                            name="phone"
                            size={20}
                            color={colors.primaryTextColor} />
                        <Text style={[{ color: colors.primaryTextColor }, styles.infoText]}>
                            {data.phone}
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={() => setIsOpen(true)}
                    style={[styles.btn, {
                        backgroundColor: colors.primaryBgColor2,
                        paddingHorizontal: 15,
                    }]}
                >
                    <Feather
                        name="edit"
                        size={28}
                        color={colors.primaryTextColor} />
                    <Text style={[styles.iconText, {
                        color: colors.primaryTextColor
                    }]}>
                        Edit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsChangePassword(true)}
                    style={[styles.btn, {
                        backgroundColor: colors.primaryBgColor2,
                        paddingHorizontal: 11
                    }]}
                >
                    <MaterialIcons
                        name="key"
                        color={colors.primaryTextColor}
                        size={28}
                    />
                    <Text style={[styles.iconText, {
                        color: colors.primaryTextColor
                    }]}>
                        Change
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setIsComfirm(true)}
                    style={[styles.btn, {
                        backgroundColor: colors.primaryBgColor2,
                        paddingHorizontal: 11
                    }]}
                >
                    <MaterialIcons
                        name="delete"
                        size={28}
                        color={colors.danger}
                    />
                    <Text style={[styles.iconText, {
                        color: colors.primaryTextColor
                    }]}>
                        Delete
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={async () => await onLogout!()}
                    style={[styles.btn, {
                        backgroundColor: colors.primaryBgColor2,
                        paddingHorizontal: 11
                    }]}
                >
                    <MaterialIcons
                        name="logout"
                        size={28}
                        color={colors.danger}
                    />
                    <Text style={[styles.iconText, {
                        color: colors.primaryTextColor
                    }]}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
                <ProfileEditForm
                    handleForm={(data) => handleEditProfile(data)}
                    initialValue={initialValue}
                    setIsOpen={setIsOpen}
                    loading={isLoading}
                />
            </FormModal>
            <FormModal isOpen={isChangePassword} setIsOpen={setIsChangePassword}>
                <PasswordChangeForm
                    handleForm={(data) => handleChangePassword(data)}
                    loading={isLoading}
                    setIsOpen={setIsChangePassword}
                />
            </FormModal>
            <ConfirmModal
                header='Delete Account'
                message='Permanently delete your account'
                handleForm={async () => await onDeleteAccount()}
                btnLabel='Delete'
                isLoading={isLoading}
                isOpen={isConfirm}
                setIsOpen={setIsComfirm}
            />
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
    profileWrapper: {
        position: "relative",
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 125,
        height: 125,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    cameraIcon: {
        width: 35,
        height: 35,
        borderRadius: 50,
        position: "absolute",
        bottom: -10,
        right: -10,
        justifyContent: "center",
        alignItems: "center"
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
    infoContainer: {
        flexDirection: "row",
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
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 'auto',
        marginVertical: 50,
    },
    btn: {
        marginHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 10,
        borderRadius: 15,
        boxShadow: '0 4 8 0 rgba(0, 0, 0, 0.2)',
    },
    iconText: {
        fontSize: 12,
        textAlign: 'center'
    }
});
