import { View, Text, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'
import { SHADOWS, SIZES } from '../constants/Theme'

export const ActivityBadge = () => (
    <View
        style={{
            backgroundColor: '#8FFD67',
            width: SIZES.medium,
            height: SIZES.medium,
            borderRadius: 50,
            ...SHADOWS.light,
            shadowColor: '#73017B'
        }} />
)


export const NewImageBadge = () => (
    <Image source={assets.add_image} style={{ width: 20, height: 20, tintColor: 'white' }} />
)

export const StudyBuddyBadge = (size) => (
    <Text style={{ fontSize: size || SIZES.medium }}>{'🤓'}</Text>

)