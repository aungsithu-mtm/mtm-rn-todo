import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
    StyleSheet
} from 'react-native';
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Form, Formik } from "formik";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { ModalType, SocialType } from '@/enums/common'
import validationAuthSchema from "./validationSchema"
import { AuthType } from "@/types/Auth"
import { CustomTextInput } from "@/components/form"

type Props = {
    mode: ModalType;
    loading?: boolean;
    handleForm: (data: AuthType) => void
}

const AuthFrom: React.FC<Props> = ({ mode, loading = false, handleForm }) => {
    const navigate = useRouter();
    const [initialValues] = useState<AuthType>({
        email: "",
        password: "",
        username: ""
    })
    const { top } = useSafeAreaInsets();
    return (
        <View style={[style.container, { paddingTop: top }]}>
            <Text> Hello I m form</Text>
            <View style={{ paddingHorizontal: 30 }}>
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
                            <View style={style.inputContainer}>
                                <Text style={style.label}>Email</Text>
                                <CustomTextInput
                                    handleChange={handleChange("email")}
                                    handleBlur={handleBlur("email")}
                                    value={values.email}
                                    name="email"
                                />
                            </View>

                            <Text
                                style={{
                                    color: "red",
                                    fontSize: 12,
                                    paddingTop: 5,
                                }}
                            >
                                {errors.email}
                            </Text>
                        </>

                    )}
                </Formik>
                <TouchableOpacity>
                    <Text> Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AuthFrom

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "#F5F7F8",
    },
    inputContainer: {
        paddingBottom: 15,
    },
    label: {
        fontSize: 14,
        color: "#1A2130",
        paddingBottom: 6,
    },
});



