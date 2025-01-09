import { Stack } from "expo-router";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
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
      </Stack>
    </ThemeProvider>

  )
}


