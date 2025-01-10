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
import React, { useContext, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Form, Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { ModalType, SocialType } from '@/enums/common'
import validationAuthSchema from "./validationSchema"
import validationCodeSchema from './validationSchema';
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/form"
import { ThemeContext } from "@/context/ThemeContext";
import AuthHeader from '../components/AuthHeader';
import AuthButton from '../components/AuthButton';
type Props = {
    mode: ModalType;
    loading?: boolean;
    handleForm: (data: AuthType) => void
}

const { width, height } = Dimensions.get("window"); // Get device width

const AuthFrom: React.FC<Props> = ({ mode, loading = false, handleForm }) => {
    mode = ModalType.VerifyEmail;
    const { colors, theme } = useContext(ThemeContext);
    const navigate = useRouter();
    const [isloading, setisLoading] = useState(false);

    const { top } = useSafeAreaInsets();

    const handleCode = async (value: string) => {
        console.log("I handled It")
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
                                    placeholder="Code"
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
                                loading={loading}
                                type='fill'
                            />
                            <View style={style.resendGroup}>
                                <Text style={style.textResend}>Don't receive a code? </Text>
                                {/* {timer > 0 ? (
                                    <Text
                                        style={style.textResend}
                                    >{`Resend in ${timer} seconds`}</Text>
                                ) : (
                                    <TouchableOpacity onPress={resendCode}>
                                        <Text style={style.btnResend}>Resend</Text>
                                    </TouchableOpacity>
                                )} */}
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>

    )
}

export default AuthFrom

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
    label: {
        fontSize: 14,
        color: "#1A2130",
        paddingBottom: 6,
    },
    headingContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 35,
    },
    headerLogo: {
        width: 100,
        height: 100
    },
    headerTextContainer: {
        paddingVertical: 10,
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerDescription: {
        fontSize: 14,
        fontWeight: '600',
    },
    textInput: {
        padding: 15,
        fontSize: 14,
        borderBottomWidth: 1,
        borderWidth: 1,
        borderColor: "#1A2130",
        borderRadius: 8,
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



