import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useThemeContext } from "@/context/ThemeContext";

const SettingsPage: React.FC = () => {
  const { colors, theme, setTheme } = useThemeContext();

  const handleThemeChange = async (newTheme: string) => {
    try {
      setTheme({ mode: newTheme as "light" | "dark" | "automatic" });
    } catch (error) {
      console.error("Error changing theme:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryBgColor,
        },
      ]}
    >
      <Text style={[styles.title, { color: colors.primaryTextColor }]}>
        Theme
      </Text>
      <View
        style={[
          styles.box,
          {
            backgroundColor: colors.primaryBgColor2,
          },
        ]}
      >
        {["automatic", "light", "dark"].map((mode) => (
          <TouchableOpacity
            key={mode}
            style={styles.option}
            onPress={() => handleThemeChange(mode)}
          >
            <MaterialCommunityIcons
              name={
                theme.mode === mode ? "radiobox-marked" : "radiobox-blank"
              }
              size={24}
              color={colors.primaryTextColor}
            />
            <Text style={[styles.optionText, { color: colors.primaryTextColor }]}>
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10,
  },
  box: {
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingsPage;
