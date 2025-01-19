import React, { Dispatch, SetStateAction, useState } from "react";
import { 
    View, 
    Text, 
    ScrollView, 
    KeyboardAvoidingView, 
    Platform, 
    Image, 
    TouchableOpacity 
} from "react-native";
import { Formik } from "formik";
import validationEditUserSchema from "../validation/validationEditUserSchema";
import { EditUserForm} from "@/types";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTextInput, MICON } from "@/components/form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
type Props = {
    initialValue: EditUserForm;
    handleForm: (data: EditUserForm) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setProfileImage: Dispatch<SetStateAction<string | null>>;
    loading?: boolean,
    error?: any
};

const UserEditForm: React.FC<Props> = ({
    setProfileImage,
    handleForm,
    initialValue,
    setIsOpen,
    loading,
    error
}) => {
    const { colors } = useThemeContext();
    const navigate = useRouter();
    const { top } = useSafeAreaInsets();
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
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ paddingTop: top }}>
                <Text style={[styles.header, { color: colors.primaryTextColor }]}>
                    Edit User
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
                    validationSchema={validationEditUserSchema}
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
                            {/* User Name Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="User Name"
                                    fieldName="Username"
                                    handleChange={handleChange("username")}
                                    handleBlur={handleBlur("username")}
                                    errors={errors.username}
                                    touched={touched.username}
                                    value={values.username}
                                    name="username"
                                    color={colors.primaryTextColor}
                                    icon={MICON.USERNAME}
                                    editable={false}
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
                                    value={values.email}
                                    name="email"
                                    color={colors.primaryTextColor}
                                    type="email"
                                    icon={MICON.EMAIL}
                                    editable={false}
                                />
                            </View>
                            {/* First Name Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="First Name"
                                    fieldName="firstName"
                                    handleChange={handleChange("firstName")}
                                    handleBlur={handleBlur("firstName")}
                                    errors={errors.firstName}
                                    touched={touched.firstName}
                                    value={values.firstName || ''}
                                    name="firstName"
                                    color={colors.primaryTextColor}
                                    icon={MICON.FIRSTNAME}
                                />
                            </View>
                            {/* Last Name Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="Last Name"
                                    fieldName="lastName"
                                    handleChange={handleChange("lastName")}
                                    handleBlur={handleBlur("lastName")}
                                    errors={errors.lastName}
                                    touched={touched.lastName}
                                    value={values.lastName || ''}
                                    name="lastName"
                                    color={colors.primaryTextColor}
                                    icon={MICON.FIRSTNAME}
                                />
                            </View>
                            {/* Phone Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="Phone Number"
                                    fieldName="phone"
                                    handleChange={handleChange("phone")}
                                    handleBlur={handleBlur("phone")}
                                    errors={errors.phone}
                                    touched={touched.phone}
                                    value={values.phone || ''}
                                    name="phone"
                                    color={colors.primaryTextColor}
                                    icon={MICON.PHONE}
                                />
                            </View>
                            {/* Address Field */}
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="Address"
                                    fieldName="address"
                                    handleChange={handleChange("address")}
                                    handleBlur={handleBlur("address")}
                                    errors={errors.address}
                                    touched={touched.address}
                                    value={values.address || ''}
                                    name="address"
                                    color={colors.primaryTextColor}
                                    icon={MICON.ADDRESS}
                                />
                            </View>
                            {/* Buttons */}
                            <ExecuteButton
                                loading={loading}
                                handleSubmit={handleSubmit}
                                style={{ backgroundColor: colors.primaryTextColor }}
                                btnLabel={"Edit"}
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
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default UserEditForm;

