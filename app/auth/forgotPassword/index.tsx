import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ModalType } from '@/enums/common'
import validationForgotSchema from './validationSchema';
import { ForgetFormValues } from "@/types/auth";
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/form"
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
    const [ isSendMail, setIsSendMail] = useState(false);
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
        <View style={[style.container, { paddingTop: top, backgroundColor: colors.primaryBgColor }]}>
            <Image
                source={require("../../../assets/images/bottomBg.png")}
                style={style.backgroundImage}
            />
            <TouchableOpacity onPress={() => navigate.back()} style={{ marginTop: 20 }}>
                {Platform.OS === "ios"
                    ? (<MaterialIcons name="arrow-back-ios-new" size={24} color="#1A2130" />)
                    : (<MaterialIcons name="arrow-back" size={24} color="#1A2130" />)}
            </TouchableOpacity>
            <AuthHeader mode={mode} />
            <View style={style.formContainer}>
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
                            <View style={style.inputContainer}>
                                <CustomTextInput
                                        color={colors.dark}
                                        type='email'
                                        placeholder="Email Address"
                                        handleChange={handleChange("email")}
                                        handleBlur={handleBlur("email")}
                                        name='email'
                                        value={values.email ? values.email : ''}
                                    />
                                    {errors.email && touched.email && (
                                        <Text
                                            style={{
                                                color: colors.danger,
                                                fontSize: 12,
                                                paddingTop: 5,
                                            }}
                                        >
                                            {errors.code}
                                        </Text>
                                    )}
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
                                        name='password'
                                        value={values.password ? values.password : ''}
                                    />
                                    {errors.password && touched.password && (
                                        <Text
                                            style={{
                                                color: colors.danger,
                                                fontSize: 12,
                                                paddingTop: 5,
                                            }}
                                        >
                                            {errors.code}
                                        </Text>
                                    )}
                                </View>
                                <View style={style.inputContainer}>
                                <CustomTextInput
                                    color={colors.dark}
                                    type='number'
                                    placeholder="Verification Code"
                                    handleChange={handleChange("code")}
                                    handleBlur={handleBlur("code")}
                                    name='code'
                                    value={values.code ? values.code : ''}
                                />
                                {errors.code && touched.code && (
                                    <Text
                                        style={{
                                            color: colors.danger,
                                            fontSize: 12,
                                            paddingTop: 5,
                                        }}
                                    >
                                        {errors.code}
                                    </Text>
                                )}
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
            </View>
        </View>

    )
}

export default ForgotPassword

const backgroundImageHeight = 550;


const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        position: 'relative'
    },
    backgroundImage: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: width,
        height: backgroundImageHeight,
    },
    formContainer: {
        marginTop: (height - backgroundImageHeight) - 75
    },
    inputContainer: {
        paddingBottom: 15,
    }
});




