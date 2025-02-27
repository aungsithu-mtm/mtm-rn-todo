import React from "react";
import { Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useRouter } from "expo-router";
import { useThemeContext } from "@/context/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const { colors } = useThemeContext();
  const { top } = useSafeAreaInsets();
  const openLink = async () => {
    WebBrowser.openBrowserAsync("https://metateammyanmar.com/en/");
  };
  const navigate = useRouter();

  const { width } = Dimensions.get("window"); // Get device width
  const insets = useSafeAreaInsets(); // For safe area padding (e.g., status bar)

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryBgColor }]}>
      <View style={styles.background}>
        <Image
          source={require("../assets/images/topBg.png")}
          style={styles.backgroundImage}
        />
        <Image
          source={require('../assets/images/todo-logo.png')}
          style={styles.logoImage}
        />
      </View>
      <View style={[styles.wpDescribe]}>
        <Text style={[styles.describe, { fontSize: 22, fontWeight: 500, color: colors.primaryTextColor }]}>
          Welcome!
        </Text>
        <Text style={[styles.describe, { textAlign: "center", color: colors.primaryTextColor }]}>
          MTM နှင့်အတူ {'\n'}
          အောင်မြင်သော အနာဂတ်သစ်ဆီသို့ ချီတက်ကြစို့
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.btnFill, { backgroundColor: colors.secondaryBgColor }]}
          onPress={() => navigate.push("/auth/signin")}
        >
          <Text style={{ textAlign: "center", color: colors.secondaryTextColor, fontWeight: 600 }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnOutline, { borderColor: colors.secondaryBgColor }]}
          onPress={() => navigate.push("/auth/signup")}
        >
          <Text style={{ textAlign: "center", color: colors.primaryTextColor, fontWeight: 600 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.primaryTextColor }]}>
          By signing in, you agree to our  {'\n'}
          <Text style={styles.link} onPress={openLink}>
            {" "}
            terms and conditions
          </Text>{" "}
          and {' '}
          < Text style={styles.link} onPress={openLink}>
            privacy policy
          </Text>
        </Text>
      </View>
    </View >
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    top: 0,
    width: width,
    height: 325,
  },
  background: {
    position: "relative",
    height: 350,
  },
  logoImage: {
    width: 150,
    height: 150,
    position: 'absolute',
    left: '20%',
    top: '12%',
    transform: 'translate(20%, 12%)'
  },
  wpDescribe: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  describe: {
    fontSize: 14,
    lineHeight: 21,
    paddingTop: 12,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    marginHorizontal: 'auto',
    width: "85%",
  },
  btnFill: {
    paddingVertical: 18,
    borderRadius: 21,
    marginVertical: 12,
    width: "100%",
  },
  btnOutline: {
    borderWidth: 1,
    paddingVertical: 18,
    borderRadius: 21,
    width: "100%",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    marginHorizontal: 'auto',
    width: '100%',
  },
  footerText: {
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  link: {
    fontSize: 12,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
