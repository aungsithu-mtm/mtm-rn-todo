import { Colors } from "@/constants/Color";
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
});


export default styles;
