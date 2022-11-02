import { View, Text, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'

const CameraHeader = () => {
    return (
        <View style={{ height: '50%' }}>
            <Image source={assets.close} style={{ width: 20, height: 20 }} />
        </View>
    )
}

export default CameraHeader