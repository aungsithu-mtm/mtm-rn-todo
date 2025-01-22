import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Color";

type Theme = {
  mode: "light" | "dark" | "automatic";
};

type ThemeContextType = {
  theme: Theme;
  colors: typeof Colors.light | typeof Colors.dark;
  toggleTheme: () => void;
  setTheme: (newTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: { mode: "automatic" },
  colors: Colors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>({ mode: "automatic" });
  const [colors, setColors] = useState(Colors.light);

  const updateTheme = async (newTheme: Theme) => {
    const colorScheme =
      newTheme.mode === "automatic"
        ? Appearance.getColorScheme()
        : newTheme.mode;
    setThemeState({ mode: newTheme.mode });
    setColors(colorScheme === "dark" ? Colors.dark : Colors.light);
    await AsyncStorage.setItem("appTheme", JSON.stringify(newTheme));
  };

  const toggleTheme = () => {
    const newMode = theme.mode === "dark" ? "light" : "dark";
    updateTheme({ mode: newMode });
  };

  const fetchStoredTheme = async () => {
    try {
      const storedTheme = await AsyncStorage.getItem("appTheme");
      if (storedTheme) {
        const parsedTheme = JSON.parse(storedTheme) as Theme;
        updateTheme(parsedTheme);
      } else {
        updateTheme({ mode: "automatic" });
      }
    } catch (error) {
      console.error("Error fetching stored theme:", error);
    }
  };

  useEffect(() => {
    fetchStoredTheme();
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (theme.mode === "automatic") {
        setColors(colorScheme === "dark" ? Colors.dark : Colors.light);
      }
    });
    return () => subscription.remove();
  }, [theme.mode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colors,
        toggleTheme,
        setTheme: updateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
};
