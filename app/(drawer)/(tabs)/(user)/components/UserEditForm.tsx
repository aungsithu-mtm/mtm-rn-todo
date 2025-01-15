import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from "formik";
import validationEditUserSchema from "../validation/validationEditUserSchema";
import { EditUserForm } from "@/types";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTextInput, MICON } from "@/components/Form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import styles from "./styles";
type Props = {
    initialValue: EditUserForm;
    handleForm: (data: EditUserForm) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const UserEditForm: React.FC<Props> = ({
    handleForm,
    initialValue,
    setIsOpen,
}) => {
    const { colors } = useThemeContext();
    const navigate = useRouter();
    const { top } = useSafeAreaInsets();
    const [image, setImage] = useState<string | null>(null);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ paddingTop: top }}>
                <Text style={[styles.header, { color: colors.primaryTextColor }]}>Edit User</Text>
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

