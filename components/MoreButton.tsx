import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'

const MoreButton = ({ style, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[{

                backgroundColor: '#00000030',
                width: 40,
                height: 40,
                borderRadius: 50,
                alignItems: 'center',
                padding: 5,
                justifyContent: 'center'
            }, { ...style }]}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />

        </TouchableOpacity>
    )
}

export default MoreButton