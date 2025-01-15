import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik } from "formik";
import validationAddUserSchema from "../validation/validationAddUserSchema";
import { AddUserForm } from "@/types";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomTextInput, MICON } from "@/components/Form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import styles from "./styles";

type Props = {
    initialValue: AddUserForm;
    handleForm: (data: AddUserForm) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    loading?: boolean,
    error?: any
};

const UserCreateForm: React.FC<Props> = ({
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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={[styles.header, { color: colors.primaryTextColor }]}>Create User</Text>
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
                                {/* Password Field*/}
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        placeholder="Default Password"
                                        fieldName="Password"
                                        handleChange={handleChange("password")}
                                        handleBlur={handleBlur("password")}
                                        errors={errors.password}
                                        touched={touched.password}
                                        value={values.password}
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


