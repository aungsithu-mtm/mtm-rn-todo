import React, { Dispatch, SetStateAction, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Formik } from "formik";
import validationEditProfileSchema from "../validation/editProfileSchema";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTextInput } from "@/components/Form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import { User } from "@/types";
import styles from "./styles";
type Props = {
    initialValue: User;
    handleForm: (data: User) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    loading?: boolean,
    error?: any
};

const ProfileEditForm: React.FC<Props> = ({
    handleForm,
    initialValue,
    setIsOpen,
    loading,
    error
}) => {
    const { colors } = useThemeContext();
    const { top } = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ paddingTop: top }}>
                <Text style={[styles.header, { color: colors.primaryTextColor }]}>
                    Edit Profile
                </Text>
                <Formik
                    initialValues={initialValue}
                    onSubmit={(values) => handleForm(values)}
                    validationSchema={validationEditProfileSchema}
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
                                    icon="person"
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
                                    type={"email-address"}
                                    icon="email"
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
                                    icon="person"
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
                                    icon="person"
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
                                    type="numeric"
                                    color={colors.primaryTextColor}
                                    icon="phone"
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
                                    icon="home"
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

export default ProfileEditForm;

