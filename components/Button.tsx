import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Colors } from '../constants'

const Button = ({ condition = true, onPress, background = Colors.light.primary, tint = 'white', title, activeOpacity = 0.7 }) => {
    console.log(condition)
    return (
        <TouchableOpacity
            onPress={condition ? onPress : () => { }}
            activeOpacity={condition ? activeOpacity : 1}
            style={{ borderRadius: 50, width: '100%', backgroundColor: condition ? background : 'gray', padding: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: tint, fontFamily: "Kanit", fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Button