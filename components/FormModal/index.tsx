import { View, Text, Modal, TouchableOpacity, GestureResponderEvent, StyleSheet } from "react-native";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { useThemeContext } from "@/context/ThemeContext";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

interface FormModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const FormModal: React.FC<FormModalProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  const { colors } = useThemeContext();
  const handleOverlayPress = () => {
    setIsOpen(false);
  };

  const handleModalPress = (e: GestureResponderEvent): boolean => {
    e.stopPropagation();
    return true;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Modal
          visible={isOpen}
          statusBarTranslucent={false}
          transparent={true}
          animationType="slide"
        >
          <TouchableOpacity onPress={handleOverlayPress} style={styles.content}>
            <View onStartShouldSetResponder={handleModalPress} style={[styles.card, { backgroundColor: colors.barColor }]}>
              {children}
            </View>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default FormModal;


const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  content: {
    flex: 1,
    position: 'relative',
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
  }
});
