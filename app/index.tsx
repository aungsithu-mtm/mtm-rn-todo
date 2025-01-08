import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const navigate = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity
        onPress={() => navigate.push("/(tabs)/(todo)/pages")}
      >
        <Text style={{ textAlign: "center", color: "black", fontWeight: 600 }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
