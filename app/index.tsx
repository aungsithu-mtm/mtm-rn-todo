import React, { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";

export default function Index() {
  const { colors } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();
  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://metateammyanmar.com/en/");
  };
  const navigate = useRouter();

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image
        source={require("../assets/images/background.png")}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <LinearGradient
        colors={["transparent", "rgba(16, 55, 92, 0.7)", "rgba(16, 55, 92, 1)"]}
        style={styles.background}
      />
      <View style={styles.logo}>
        <Image
          source={require("../assets/images/todo-logo.png")}
          style={{ width: 100, height: 120 }}
        />
      </View>
      <View style={styles.wpDescribe}>
        <Text style={[styles.describe, { fontSize: 22, fontWeight: 500 }]}>
          Welcome To Our Todo
        </Text>
        <Text style={[styles.describe, { textAlign: "center" }]}>
          သင်နဲ့အတူ သင့်မိသားစုအောင််မြင်ဖို့ {"\n"} ကျွန်တော်တို့ ၏ App ကိုယုံကြည်လိုက်ပါ
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.btnFill, { backgroundColor: colors.secondary }]}
          onPress={() => navigate.push("/auth/signin")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText, fontWeight: 600 }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnOutline, { borderColor: colors.primary }]}
          onPress={() => navigate.push("/auth/signup")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryText, fontWeight: 600 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          By signing in, you agree to our
          <Text style={styles.link} onPress={openLink}>
            {" "}
            terms and conditions
          </Text>{" "}
          and{" "}
          <Text style={styles.link} onPress={openLink}>
            {" "}
            privacy policy
          </Text>
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  background: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  logo: {
    position: "absolute",
    top: 120,
    left: '42%',
    justifyContent: "center",
    alignItems: "center",
  },
  logoTtl: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 10,
  },
  wpDescribe: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  describe: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 21,
    paddingTop: 12,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    width: "100%",
  },
  btnFill: {
    paddingVertical: 18,
    borderRadius: 8,
    marginVertical: 12,
    width: "100%",
  },
  btnOutline: {
    borderWidth: 1,
    paddingVertical: 18,
    borderRadius: 8,
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "56%",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
