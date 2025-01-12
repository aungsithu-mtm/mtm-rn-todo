import { Stack, useRouter } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ApolloProvider } from "@apollo/client";
import { ClerkProvider,ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "../utils/cache";
import { AuthProvider } from "@/context/AuthContext";
import apolloClient from "../apollo/client";
import Toast from "react-native-toast-message";
import FlashMessage from "react-native-flash-message";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";

const InitialLayout = () => {
  const {isSignedIn, isLoaded} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if(!isLoaded) return;
    if(isSignedIn){
      router.replace("/(tabs)/(todo)/pages")
    }
  }, [isSignedIn])
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
        name="auth/forgotPassword/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  const client = apolloClient();
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!publishableKey) {
    throw new Error("Clerk publishable key is not set");
  }
  return (
<ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
  <ApolloProvider client={client}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
         <AuthProvider>
        <ThemeProvider>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <InitialLayout />
          </ScrollView>
        </ThemeProvider>
        </AuthProvider>
      </KeyboardAvoidingView>
      <Toast />
      <FlashMessage position="center" />
    </GestureHandlerRootView>
  </ApolloProvider>
</ClerkProvider>


  );
};

export default RootLayoutNav;



