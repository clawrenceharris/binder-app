import { View, Text, Image } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import { SHADOWS, SIZES } from '../constants/Theme'

export const ActivityBadge = () => (
    <View
        style={{
            backgroundColor: Colors.green,
            width: 10,
            height: 10,
            borderRadius: 50,
            ...SHADOWS.light,
            shadowColor: '#00000020'
        }} />
)


export const NewImageBadge = () => (
    <Image source={assets.add_image} style={{ width: 20, height: 20, tintColor: 'white' }} />
)

export const StudyBuddyBadge = (size) => (
    <Text style={{ fontSize: size || SIZES.medium }}>{'🤓'}</Text>

)