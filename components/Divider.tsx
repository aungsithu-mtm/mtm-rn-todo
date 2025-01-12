import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

type Props = {
  title: string
}
const { colors } = useThemeContext();

const Divider: React.FC<Props> = ({ title }) => {
  return (
    <View style={style.container}>
      <View style={[style.line]}></View>
      <Text style={style.dividerTxt}>{title}</Text>
      <View style={style.line}></View>
    </View>
  )
}

export default Divider

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    overflow: 'hidden'
  },
  line: {
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '55%'
  },
  dividerTxt: {
    color: colors.gray,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 13
  }
})