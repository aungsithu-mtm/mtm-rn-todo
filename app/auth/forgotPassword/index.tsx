import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions,
    Image,
    ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalType } from '@/enums/common'
import validationForgotSchema from './validationSchema';
import { ForgetFormValues } from "@/types";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/Form"
import { useThemeContext } from "@/context/ThemeContext";
import { useAuthContext } from '@/context/AuthContext';
import AuthHeader from '../components/AuthHeader';
import AuthButton from '../components/AuthButton';
type Props = {
    mode: ModalType;
    handleForm: (data: AuthType) => void
}

const { width, height } = Dimensions.get("window"); // Get device width

const ForgotPassword: React.FC<Props> = ({ mode, handleForm }) => {
    mode = ModalType.forgotPassword
    const { colors } = useThemeContext();
    const { onForgotPassword, onResetPassword } = useAuthContext();
    const [isSendMail, setIsSendMail] = useState(false);
    const navigate = useRouter();
    const [isloading, setisLoading] = useState(false);
    const { top } = useSafeAreaInsets();

    const defaultValues: ForgetFormValues = {
        email: "",
    };

    const forgotValue: ForgetFormValues = {
        password: "",
        code: "",
    };

    const handleEmail = async (email: string) => {
        setisLoading(true);
        await onForgotPassword!(email)
            .then((result) => {
                setIsSendMail(result);
            })
            .finally(() => setisLoading(false));
    };

    const handleReset = async (data: ForgetFormValues) => {
        setisLoading(true);
        await onResetPassword!(data).finally(() => setisLoading(false));
    };


    return (
        <View style={[{ flex: 1, paddingTop: top, backgroundColor: colors.primaryBgColor }]}>
            <View style={style.container}>
                <TouchableOpacity onPress={() => navigate.back()} style={{ marginTop: 20 }}>
                    {Platform.OS === "ios"
                        ? (<MaterialIcons name="arrow-back-ios-new" size={24} color="#1A2130" />)
                        : (<MaterialIcons name="arrow-back" size={24} color="#1A2130" />)}
                </TouchableOpacity>
                <Toast />
                <FlashMessage position="center" />
                <AuthHeader mode={mode} />
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    source={require("../../../assets/images/bottomBg.png")}
                    style={style.backgroundImage}
                />
                <ScrollView style={[style.formContainer, style.container]}>
                    <Formik
                        initialValues={isSendMail ? forgotValue : defaultValues}
                        onSubmit={(values: ForgetFormValues) =>
                            isSendMail ? handleReset(values) : handleEmail(values.email!)
                        }
                        validationSchema={validationForgotSchema(isSendMail)}
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
                                {!isSendMail && (
                                    <View>
                                        <CustomTextInput
                                            color={colors.dark}
                                            type='email'
                                            placeholder="Email Address"
                                            handleChange={handleChange("email")}
                                            handleBlur={handleBlur("email")}
                                            errors={errors.email}
                                            touched={touched.email}
                                            name='email'
                                            value={values.email ? values.email : ''}
                                        />

                                    </View>
                                )}
                                {isSendMail && (
                                    <>
                                        <View style={style.inputContainer}>
                                            <CustomTextInput
                                                color={colors.dark}
                                                type='password'
                                                placeholder="********"
                                                handleChange={handleChange("password")}
                                                handleBlur={handleBlur("password")}
                                                errors={errors.password}
                                                touched={touched.password}
                                                name='password'
                                                value={values.password ? values.password : ''}
                                            />
                                        </View>
                                        <View>
                                            <CustomTextInput
                                                color={colors.dark}
                                                type='number'
                                                placeholder="Verification Code"
                                                handleChange={handleChange("code")}
                                                handleBlur={handleBlur("code")}
                                                errors={errors.code}
                                                touched={touched.code}
                                                name='code'
                                                value={values.code ? values.code : ''}
                                            />

                                        </View>
                                    </>
                                )}
                                <AuthButton
                                    mode={mode}
                                    handleSubmit={handleSubmit}
                                    loading={isloading}
                                    type='fill'
                                />
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </View>

        </View >
    )
}

export default ForgotPassword

const backgroundImageHeight = 550;


const style = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
    },
    backgroundImage: {
        position: "absolute",
        width: width,
        height: backgroundImageHeight,
    },
    formContainer: {
        marginTop: (height - backgroundImageHeight) - 100,
        paddingTop: 20,
    },
    inputContainer: {
        paddingBottom: 15,
    },
});




