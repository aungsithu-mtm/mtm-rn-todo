import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik } from "formik";
import validationAddUserSchema from "../validation/validationAddUserSchema";
import { AddUserForm } from "@/types";
import * as ImagePicker from "expo-image-picker";
import { CustomTextInput, MICON } from "@/components/form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";

type Props = {
    initialValue: AddUserForm;
    setProfileImage: Dispatch<SetStateAction<string | null>>;
    handleForm: (data: AddUserForm) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    loading?: boolean,
    error?: any
};

const UserCreateForm: React.FC<Props> = ({
    setProfileImage,
    handleForm,
    initialValue,
    setIsOpen,
    loading,
    error
}) => {
    const { colors } = useThemeContext();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            let base64Img = `data:image/jpg;base64,${result.assets[0].base64!}`;
            setProfileImage(base64Img);
            setImage(result.assets[0].base64!);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={[styles.header, { color: colors.primaryTextColor }]}>
                        User Create!
                    </Text>
                    <View style={styles.profileWrapper}>
                        {image ? (
                            <Image
                                source={{ uri: "data:image/jpeg;base64," + image }}
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
                        <TouchableOpacity onPress={pickImage} style={styles.cameraIcon}>
                            <MaterialIcons
                                name="camera-alt"
                                size={30}
                                color={colors.primaryTextColor}
                            />
                        </TouchableOpacity>
                    </View>
                    <Formik
                        initialValues={initialValue}
                        onSubmit={(values) => handleForm(values)}
                        validationSchema={validationAddUserSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            errors,
                            values,
                            touched,
                        }) => (
                            <>
                                {/* First Name Field */}
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        placeholder="User Name"
                                        fieldName="Username"
                                        handleChange={handleChange("username")}
                                        handleBlur={handleBlur("username")}
                                        errors={errors.username}
                                        touched={touched.username}
                                        value={values.username || ""}
                                        name="username"
                                        color={colors.primaryTextColor}
                                        icon={MICON.USERNAME}
                                    />
                                </View>
                                {/* Email Field*/}
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        placeholder="Email"
                                        fieldName="Email"
                                        handleChange={handleChange("email")}
                                        handleBlur={handleBlur("email")}
                                        errors={errors.email}
                                        touched={touched.email}
                                        value={values.email || ""}
                                        name="email"
                                        color={colors.primaryTextColor}
                                        type="email"
                                        icon={MICON.EMAIL}
                                    />
                                </View>
                                {/* Password Field*/}
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        placeholder="Default Password"
                                        fieldName="Password"
                                        handleChange={handleChange("password")}
                                        handleBlur={handleBlur("password")}
                                        errors={errors.password}
                                        touched={touched.password}
                                        value={values.password || ""}
                                        name="password"
                                        color={colors.primaryTextColor}
                                        type="password"
                                        icon={MICON.PASSWORD}
                                    />
                                </View>

                                {/* Buttons */}
                                <ExecuteButton
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    style={{ backgroundColor: colors.primaryTextColor }}
                                    btnLabel={"Create"}
                                    labelStyle={[styles.btnText, { color: colors.primaryBgColor }]}
                                />
                                <ExecuteButton
                                    handleSubmit={() => { setIsOpen(false) }}
                                    btnLabel={"Cancel"}
                                    style={styles.unfillBtn}
                                    buttonType="unFill"
                                    labelStyle={[styles.btnText, { color: colors.primaryTextColor }]}
                                />
                            </>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </View>

    );
};

export default UserCreateForm;


