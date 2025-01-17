import { Text, Image, TouchableOpacity, Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useThemeContext } from "@/context/ThemeContext";

type Props = {
    header: string;
    btnLabel: string;
    message: string;
    handleForm: () => void;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isLoading: boolean,
};

export const ConfirmModal: React.FC<Props> = ({
    handleForm,
    header,
    btnLabel,
    message,
    isOpen,
    setIsOpen,
    isLoading
}) => {
    const { colors } = useThemeContext();

    const handleOverlayPress = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Modal
                visible={isOpen}
                statusBarTranslucent={false}
                transparent={true}
                animationType="slide"
            >
                <TouchableOpacity onPress={handleOverlayPress} style={styles.modalContainer}>
                    <View style={styles.content}>
                        <Text style={styles.formHeader}>{header}</Text>
                        <Image
                            source={require("@/assets/images/img-warning.png")}
                            style={styles.warningImg}
                        />
                        <Text style={[styles.confirmMessage, { color: colors.primaryTextColor }]}>{message}</Text>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.danger }]}
                                onPress={handleForm}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={colors.light} />
                                ) : (
                                    <Text style={[styles.btnText, { color: colors.primaryBgColor }]}>{btnLabel}</Text>
                                )}
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, { backgroundColor: colors.primaryBgColor }]}
                                onPress={() => handleOverlayPress()}
                            >
                                <Text style={[styles.btnText, { color: colors.primaryTextColor }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal >
        </>
    );
};


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        position: 'relative',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.8)",
    },
    content: {
        backgroundColor: "#FFFFFF",
        padding: 25,
        borderRadius: 25,
        justifyContent: 'center',
    },
    formHeader: {
        fontSize: 22,
        fontWeight: "500",
        paddingBottom: 20,
        textAlign: 'center',
    },
    warningImg: {
        width: 120,
        height: 120,
        margin: "auto",
        paddingBottom: 15,
    },
    confirmMessage: {
        fontSize: 16,
        fontWeight: 'semibold',
        lineHeight: 24,
        paddingBottom: 15,
    },
    btnContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        width: '90%',
        marginHorizontal: 0,
        justifyContent: "center",
    },
    button: {
        width: "40%",
        height: 56,
        borderRadius: 10,
        justifyContent: "center",
    },
    btnText: {
        fontWeight: "600",
        textAlign: 'center',
        fontSize: 16,
    },
});
