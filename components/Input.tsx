import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '../constants'
import { styles } from '../screens/SignUp';
import useColorScheme from '../hooks/useColorScheme';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  style?: ViewStyle;
  selectionColor?: string;
  keyboardType?: 'number-pad' | 'email-address' | 'decimal-pad' | 'default';
  secureTextEntry?: boolean;
  onBlur?: () => void;
  textStyle?: TextStyle;
  returnKeyType?: 'search' | 'done' | 'go' | 'next'
}

const Input: FC<Props> = (props) => {
  const colorScheme = useColorScheme()
  return (
    <TextInput
      placeholder={props.placeholder}
      style={[styles.input, { color: Colors[colorScheme].tint, ...props.style, ...props.textStyle }]}
      value={props.value}
      onChangeText={(value) => props.onChangeText(value)}
      placeholderTextColor={'#00000030'}
      selectionColor={props.selectionColor || Colors.accent}
      keyboardType={props.keyboardType}
      onBlur={props.onBlur}
      secureTextEntry={props.secureTextEntry}
      returnKeyType={props.returnKeyType}
    />


  )
}




export default Input