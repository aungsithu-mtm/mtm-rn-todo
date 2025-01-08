import React, { createContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/constants/Color";

type Theme = {
    mode: "light" | "dark" | null | undefined;
};

type ThemeContextType = {
    theme: Theme;
    colors: typeof Colors.light; // Dynamic color scheme
    toggleTheme: () => void;
    setTheme: (newTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: { mode: null },
    colors: Colors.light,
    toggleTheme: () => { },
    setTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>({ mode: Appearance.getColorScheme() });
    const [colors, setColors] = useState(Colors.light);

    const updateTheme = async (newTheme: Theme) => {
        setTheme(newTheme);
        const currentColors = newTheme.mode === "dark" ? Colors.dark : Colors.light;
        setColors(currentColors);
        await AsyncStorage.setItem("appTheme", JSON.stringify(newTheme));
    };

    const toggleTheme = () => {
        const mode = theme.mode === "dark" ? "light" : "dark";
        updateTheme({ mode });
    };

    const fetchStoredTheme = async () => {
        try {
            const themeData = await AsyncStorage.getItem("appTheme");
            if (themeData) {
                const storedTheme = JSON.parse(themeData) as Theme;
                setTheme(storedTheme);
                const currentColors = storedTheme.mode === "dark" ? Colors.dark : Colors.light;
                setColors(currentColors);
            }
        } catch (error) {
            console.error("Error fetching theme:", error);
        }
    };

    useEffect(() => {
        fetchStoredTheme();
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            const mode = colorScheme || "light";
            updateTheme({ mode });
        });
        return () => subscription.remove();
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, colors, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
