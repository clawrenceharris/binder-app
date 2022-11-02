import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../constants'

const CircleButton = ({ color, Icon, onPress, ...props }) => {
    return (
        <TouchableOpacity onPress={onPress}>

            <View style={{ borderRadius: 50, backgroundColor: color, padding: 6, width: 30, height: 30, alignItems: 'center', justifyContent: 'center', opacity: props.opacity }} >
                {Icon}


            </View>



        </TouchableOpacity>
    )
}

export default CircleButton