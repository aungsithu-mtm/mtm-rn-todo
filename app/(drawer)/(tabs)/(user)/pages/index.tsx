import { Text, View } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

export default function Index() {
    const { colors } = useThemeContext();
    return (
        <View
            style={{
                backgroundColor: colors.primaryBgColor,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{ color: colors.primaryTextColor }}>User Screen</Text>
        </View>
    );
}
