import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from "react-native";
import { useThemeContext } from "@/context/ThemeContext";

type Props = {
  title: string
}


const Divider: React.FC<Props> = ({ title }) => {
  const { colors } = useThemeContext();
  return (
    <View style={style.container}>
      <View style={[style.line, {borderBottomColor : colors.gray}]}></View>
      <Text style={[style.dividerTxt, {color: colors.gray}]}>{title}</Text>
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
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '55%'
  },
  dividerTxt: {
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 13
  }
})