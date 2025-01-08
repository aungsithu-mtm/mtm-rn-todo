import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StyleSheet } from "react-native";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  title: string
}
const { colors } = useContext(ThemeContext)

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
    borderBottomColor: colors.black,
    borderBottomWidth: 1,
    marginHorizontal: 10,
    width: '55%'
  },
  dividerTxt: {
    color: colors.black,
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 13
  }
})