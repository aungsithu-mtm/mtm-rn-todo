import {
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Color";

type Props = {
  btnLabel: string;
  loading?: boolean;
  handleSubmit: () => void;
  buttonType?: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export const ExecuteButton: React.FC<Props> = ({
  btnLabel,
  loading,
  handleSubmit,
  buttonType = "fill",
  style,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, style]}
      onPress={() => handleSubmit()}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={Colors.light.primary} />
      ) : (
        <Text style={[styles.btnLabel, labelStyle]}>
          {btnLabel}
        </Text>
      )
      }
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
});

