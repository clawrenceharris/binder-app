import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants'
import { styles } from '../screens/SignUp'

const Input = ({ value, onChangeText, placeholder, style }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={[styles.input, { ...style }]}
      value={value}
      onChangeText={(value) => onChangeText(value)}
      placeholderTextColor={'#00000030'}

      selectionColor={Colors.light.primary}

    />


  )
}



export default Input