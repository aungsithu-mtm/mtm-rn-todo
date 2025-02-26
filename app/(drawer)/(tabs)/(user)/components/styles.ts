import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: "500",
        paddingVertical: 20,
        textAlign: 'center'
    },

    btnText: {
        fontWeight: "600",
        fontSize: 16,
        color: 'white',
    },
    unfillBtn: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: 56,
    },
    inputContainer: {
        paddingBottom: 15,
    },
    profileWrapper: {
        width: 100,
        height: 100,
        position: "relative",
        marginBottom: 10,
        left: (width - 150) / 2,
        justifyContent: 'center', alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        objectFit: "cover",
    },
    cameraIcon: {
        width: 35,
        height: 35,
        borderRadius: 50,
        position: "absolute",
        bottom: -10,
        right: -5,
        justifyContent: "center",
        alignItems: "center"
    },
});


export default styles;
