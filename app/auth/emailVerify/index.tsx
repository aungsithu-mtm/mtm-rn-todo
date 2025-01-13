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
import validationCodeSchema from './validationSchema';
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/form"
import { useThemeContext } from "@/context/ThemeContext";
import { useAuthContext } from '@/context/AuthContext';
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import AuthHeader from '../components/AuthHeader';
import AuthButton from '../components/AuthButton';
type Props = {
    mode: ModalType;
    handleForm: (data: AuthType) => void
}

const { width, height } = Dimensions.get("window"); // Get device width

const EmailVerify: React.FC<Props> = ({ mode, handleForm }) => {
    mode = ModalType.VerifyEmail;
    const { colors } = useThemeContext();
    const { onVerify, onResendVerificationCode } = useAuthContext();
    const navigate = useRouter();
    const [isloading, setisLoading] = useState(false);
    const [timer, setTimer] = useState<number>(50);
    const { top } = useSafeAreaInsets();

    useEffect(() => {
        if (timer === 0) return;
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timer]);

    const handleCode = async (value: string) => {
        setisLoading(true);
        await onVerify!(value).finally(() => setisLoading(false));
    };

    const resendCode = () => {
        setTimer(50);
        onResendVerificationCode!();
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
                        initialValues={{ code: "" }}
                        onSubmit={(values) => handleCode(values.code)}
                        validationSchema={validationCodeSchema()}
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
                                <View>
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
                                <AuthButton
                                    mode={mode}
                                    handleSubmit={handleSubmit}
                                    loading={isloading}
                                    type='fill'
                                />
                                <View style={style.resendGroup}>
                                    <Text style={style.textResend}>Don't receive a code? </Text>
                                    {timer > 0 ? (
                                        <Text
                                            style={style.textResend}
                                        >{`Resend in ${timer} seconds`}</Text>
                                    ) : (
                                        <TouchableOpacity onPress={resendCode}>
                                            <Text style={style.btnResend}>Resend</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </>
                        )}
                    </Formik>
                </ScrollView>
            </View>

        </View >

    )
}

export default EmailVerify

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
    label: {
        fontSize: 14,
        color: "#1A2130",
        paddingBottom: 6,
    },
    resendGroup: {
        paddingTop: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    textResend: {
        fontSize: 16,
    },
    btnResend: {
        fontSize: 16,
    }
});



