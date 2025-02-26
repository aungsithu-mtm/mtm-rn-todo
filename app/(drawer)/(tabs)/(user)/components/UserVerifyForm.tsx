import {
    View,
    Text,
    ScrollView,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Formik } from "formik";
import validationAddUserSchema from "../validation/validationAddUserSchema";
import { CODE } from "@/types";
import { CustomTextInput } from "@/components/Form";
import { ExecuteButton } from "@/components/Button";
import { useThemeContext } from "@/context/ThemeContext";
import styles from "./styles";

type Props = {
    initialValue: CODE;
    handleForm: (data: CODE) => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    loading?: boolean,
    error?: any
};

const UserVerifyForm: React.FC<Props> = ({
    handleForm,
    initialValue,
    setIsOpen,
    loading,
    error
}) => {
    const { colors } = useThemeContext();

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <Text style={[styles.header, { color: colors.primaryTextColor }]}>
                        Verify Code
                    </Text>
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
                                        placeholder="Verify Code"
                                        fieldName="code"
                                        handleChange={handleChange("code")}
                                        handleBlur={handleBlur("code")}
                                        errors={errors.code}
                                        touched={touched.code}
                                        value={values.code}
                                        name="username"
                                        type={"numeric"}
                                        color={colors.primaryTextColor}
                                        icon="vpn-key"
                                    />
                                </View>


                                {/* Buttons */}
                                <ExecuteButton
                                    loading={loading}
                                    handleSubmit={handleSubmit}
                                    style={{ backgroundColor: colors.primaryTextColor }}
                                    btnLabel={"Verify"}
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

export default UserVerifyForm;


