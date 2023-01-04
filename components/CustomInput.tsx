import { View, Text } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Colors } from '../constants'
import Input from './Input'

const CustomInput = ({ rules, control, name, placeholder, secureTextEntry, keyboardType, selectionColor }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>

                <View>
                    <Input
                        secureTextEntry={secureTextEntry}
                        value={value}
                        placeholder={placeholder}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        selectionColor={selectionColor || Colors.accent}
                        keyboardType={keyboardType}

                    />

                </View>

            }
        />
    )
}


const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: 'black',
        backgroundColor: '#EFEFEF',
        borderRadius: 15
    },

    erroMessage: {
        color: 'red',
        alignSelf: 'stretch'
    }
})
export default CustomInput