import { View, Text, Image } from 'react-native'
import React from 'react'
import { assets } from '../constants'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'

const SettingsListItem = ({ title, value, onPress, titleColor = 'white', background = '#272727', valueColor = 'white' }) => {
    const navigation = useNavigation()

    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View>
                <View style={{ marginBottom: 10, backgroundColor: background, borderRadius: 15, flexDirection: 'row', padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ color: titleColor, fontFamily: 'KanitSemiBold', fontSize: 16 }}>{title}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: valueColor }}>{value}</Text>
                        <Image source={assets.right_arrow} style={{ width: 20, height: 20, tintColor: 'gray', marginLeft: 10 }} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>


    )
}

export default SettingsListItem