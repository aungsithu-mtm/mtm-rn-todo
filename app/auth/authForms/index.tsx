import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { ModalType, SocialType } from '@/enums/common'
import validationAuthSchema from "./validationSchema"
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/Form"
import { useThemeContext } from "@/context/ThemeContext";
import { SocialBtn } from '@/components/Button';
import Divider from '@/components/Divider';
import AuthHeader from '../components/AuthHeader';

type Props = {
    mode: ModalType;
    loading?: boolean;
    handleForm: (data: AuthType) => void
}

const { width, height } = Dimensions.get("window"); // Get device width

const AuthFrom: React.FC<Props> = ({ mode, loading = false, handleForm }) => {
    const { colors, theme } = useThemeContext();
    const navigate = useRouter();
    const [initialValues] = useState<AuthType>({
        email: "",
        password: "",
        username: ""
    })
    const { top } = useSafeAreaInsets();
    return (
        <View style={[{ flex: 1, paddingTop: top, backgroundColor: colors.primaryBgColor }]}>
            <View style={style.container}>
                <TouchableOpacity onPress={() => navigate.back()} style={{ marginTop: 20 }}>
                    {Platform.OS === "ios"
                        ? (<MaterialIcons name="arrow-back-ios-new" size={24} color="#1A2130" />)
                        : (<MaterialIcons name="arrow-back" size={24} color="#1A2130" />)}
                </TouchableOpacity>
                <AuthHeader mode={mode} />
            </View>
            <View style={{ flex: 1 }}>
                <Image
                    source={require("../../../assets/images/bottomBg.png")}
                    style={style.backgroundImage}
                />
                <ScrollView style={[style.formContainer, style.container]}>
                    <View style={style.socialGroup}>
                        <SocialBtn socialType={SocialType.Facebook} />
                        <SocialBtn socialType={SocialType.Google} />
                    </View>
                    <Divider title="Or" />
                    <View>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => handleForm(values)}
                            validationSchema={validationAuthSchema(mode)}
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
                                    {mode === ModalType.SignUp && (
                                        <View style={style.inputContainer}>
                                            <CustomTextInput
                                                color={colors.dark}
                                                placeholder="User name"
                                                handleChange={handleChange("username")}
                                                handleBlur={handleBlur("username")}
                                                errors={errors.username}
                                                touched={touched.username}
                                                name='username'
                                                value={values.username ? values.username : ''}
                                            />

                                        </View>
                                    )}
                                    <View style={style.inputContainer}>
                                        <CustomTextInput
                                            color={colors.dark}
                                            placeholder="email"
                                            handleChange={handleChange("email")}
                                            handleBlur={handleBlur("email")}
                                            errors={errors.email}
                                            touched={touched.email}
                                            name='email'
                                            value={values.email ? values.email : ''}
                                            type='email-address'
                                        />

                                    </View>
                                    <View>
                                        <CustomTextInput
                                            color={colors.dark}
                                            placeholder='password'
                                            handleChange={handleChange("password")}
                                            handleBlur={handleBlur("password")}
                                            errors={errors.password}
                                            touched={touched.password}
                                            name='password'
                                            value={values.password ? values.password : ''}
                                            isPassword={true}
                                        />
                                    </View>
                                    {mode == ModalType.Signin && (
                                        <View style={{ marginTop: 5 }}>
                                            <Link href={"/auth/forgotPassword"} replace style={style.fpwdContainer}>
                                                <Text style={{ fontSize: 14, color: colors.danger }}>Forgot password?</Text>
                                            </Link>
                                        </View>
                                    )}
                                    <TouchableOpacity
                                        style={[style.btnFill, { backgroundColor: colors.dark }]}
                                        onPress={() => handleSubmit()}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <ActivityIndicator color={colors.light} />
                                        ) : (
                                            <Text style={{ textAlign: "center", color: colors.light, fontWeight: 600 }}>
                                                {mode === ModalType.Signin ? "Sign in" : "Sign up"}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                  
                                </>
                            )}

                        </Formik>
                        <View style={style.signUpRedirect}>
                            <Text style={{ fontSize: 14 }}>
                                {mode == ModalType.Signin
                                    ? "Don't have an account? "
                                    : "Have an account? "}
                            </Text>
                            <Link
                                href={mode == ModalType.Signin ? "/auth/signup" : "/auth/signin"}
                                replace
                            >
                                <Text style={{ color: colors.danger, fontSize: 14 }}>
                                    {mode == ModalType.SignUp ? "Sign in" : "Sign up"}
                                </Text>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </View>

        </View >
    )
}

export default AuthFrom

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
        paddingTop: 5,
    },
    inputContainer: {
        paddingBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#1A2130",
        paddingBottom: 6,
    },

    socialGroup: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10
    },
    fpwdContainer: {
        alignSelf: "flex-end",
        alignItems: "center",
    },
    fpwd: {
        fontSize: 14,
    },
    signUpRedirect: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: Platform.OS === "ios" ? 78 : 48
    },
    btnFill: {
        paddingVertical: 18,
        borderRadius: 21,
        marginVertical: 12,
        width: "100%",
    },

});



