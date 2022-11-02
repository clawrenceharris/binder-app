import { View, Text } from 'react-native'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextInput } from 'react-native'
import { StyleSheet } from 'react-native'
import { Colors } from '../constants'

const CustomInput = ({ rules, control, name, placeholder, secureTextEntry, keyboardType }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) =>

                <View>
                    <TextInput
                        secureTextEntry={secureTextEntry}
                        value={value}
                        placeholder={placeholder}
                        style={[styles.input, { borderBottomColor: error ? '#FD6464' : 'lightgray', }]}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholderTextColor='lightgray'
                        selectionColor={Colors.light.primary}
                        keyboardAppearance={'dark'}
                        keyboardType={keyboardType}

                    />

                </View>

            }
        />
    )
}


const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 2,
        width: '100%',
        fontSize: 20,
        padding: 5,
        color: 'white'
    },

    erroMessage: {
        color: 'red',
        alignSelf: 'stretch'
    }
})
export default CustomInput