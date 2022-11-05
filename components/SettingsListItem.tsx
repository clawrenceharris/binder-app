import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets } from '../constants'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import { SHADOWS } from '../constants/Theme'

const SettingsListItem = ({ title, value, onPress, titleColor = 'white', background = '#292929', valueColor = 'gray', isTop, isBottom }) => {
    const navigation = useNavigation()
    const styles = StyleSheet.create({
        mainContainer: {
            backgroundColor: background,
            borderTopLeftRadius: isTop ? 15 : 0,
            borderTopRightRadius: isTop ? 15 : 0,
            borderBottomLeftRadius: isBottom ? 15 : 0,
            borderBottomRightRadius: isBottom ? 15 : 0,
            flexDirection: 'row',
            padding: 20,
            borderBottomColor: '#505050',
            borderBottomWidth: !isBottom && 1,
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })
    return (
        <TouchableWithoutFeedback onPress={onPress}>

            <View>
                <View style={styles.mainContainer}>
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