import { Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text>Add Screen</Text>
        </View>
    );
}
