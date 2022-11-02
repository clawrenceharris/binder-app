import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants/index.ts'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const CallButton = () => {
    const colorScheme = useColorScheme();
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{ backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#EFEFEF', width: 40, height: 40, borderTopLeftRadius: 20, borderBottomLeftRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={assets.phone} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].tint }} />

            </TouchableOpacity>

            <TouchableOpacity style={{ backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#EFEFEF', width: 40, height: 40, borderTopRightRadius: 20, borderBottomRightRadius: 20, marginLeft: 4, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={assets.video_call} style={{ width: 25, height: 25, tintColor: Colors[colorScheme].tint }} />
            </TouchableOpacity>
        </View>

    )
}

export default CallButton