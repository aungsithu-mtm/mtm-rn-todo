import Toast from "react-native-toast-message"
import { Platform } from 'react-native';
import { showMessage } from "react-native-flash-message";

const ShowToast = (title: string, message: string, type: string) => {
  console.log("HELLO I M toast")
  if (Platform.OS == "android") {
    showMessage({
      backgroundColor: "rgba(52, 52, 52, .9)",
      message: message,
      position: "center",
      style: { borderRadius: 50 },
      type: "warning",
      duration: 2000,
    })
  } else {
    Toast.show({
      type: type,
      text1: title,
      text2: message,
      position: "bottom",
      bottomOffset: 90
    })
  }
}

export default ShowToast
