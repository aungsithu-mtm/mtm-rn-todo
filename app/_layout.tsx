import { Stack, useRouter } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../apollo/client";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const InitialLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/signin"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="auth/signup"
        options={{ presentation: "modal", headerShown: false }}
      />
      <Stack.Screen
        name="auth/emailVerify/index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="auth/forgotPassword"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ThemeProvider>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <InitialLayout />
          </ScrollView>
        </ThemeProvider>

      </KeyboardAvoidingView>
      <Toast />
      <FlashMessage position="center" />
    </GestureHandlerRootView>
  );
};

export default RootLayoutNav;



