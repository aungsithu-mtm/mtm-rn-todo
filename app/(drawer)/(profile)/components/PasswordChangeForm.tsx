import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Formik } from "formik";
import passwordChangeValidation from "../validation/passwordChangeSchema";
import { UserChangePassword } from "@/types";
import { ExecuteButton } from "@/components/Button";
import { CustomTextInput } from "@/components/Form";
import { useThemeContext } from "@/context/ThemeContext";
import styles from "./styles";

type Props = {
    loading?: boolean,
    error?: any
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleForm: (data: UserChangePassword | boolean) => void;
};

const SettingForm: React.FC<Props> = ({ handleForm, loading, error, setIsOpen }) => {
    const initialValues: UserChangePassword = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    };
    const { colors } = useThemeContext();
    const { top } = useSafeAreaInsets();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={{ paddingTop: top }}>
                <Text style={[styles.header, { color: colors.primaryTextColor }]}>
                    Change Password
                </Text>
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values) => handleForm(values)}
                    validationSchema={passwordChangeValidation()}
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
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="********"
                                    fieldName="Old Password"
                                    handleChange={handleChange("currentPassword")}
                                    handleBlur={handleBlur("currentPassword")}
                                    errors={errors.currentPassword}
                                    touched={touched.currentPassword}
                                    name="currentPassword"
                                    isPassword={true}
                                    value={values.currentPassword || ""}
                                    label="Current Password"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="********"
                                    fieldName="New Password"
                                    handleChange={handleChange("newPassword")}
                                    handleBlur={handleBlur("newPassword")}
                                    errors={errors.newPassword}
                                    touched={touched.newPassword}
                                    name="newPassword"
                                    isPassword={true}
                                    value={values.newPassword || ""}
                                    label="New Password"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder="********"
                                    fieldName="Confirm Password"
                                    handleChange={handleChange("confirmPassword")}
                                    handleBlur={handleBlur("confirmPassword")}
                                    errors={errors.confirmPassword}
                                    touched={touched.confirmPassword}
                                    name="confirmPassword"
                                    isPassword={true}
                                    value={values.confirmPassword || ""}
                                    label="Confirm Password"
                                />
                            </View>
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

export default SettingForm;


