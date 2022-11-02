import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import useColorScheme from '../hooks/useColorScheme'
import { Colors } from '../constants'

const ProfileTag = ({ icon, title, onPress, ...props }) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{
                backgroundColor: colorScheme === 'light' ? '#333' : '#121212',
                borderWidth: 1,
                borderColor: colorScheme === 'light' ? 'gray' : '#303030',
                borderRadius: 50,
                height: 35,
                width: props.width,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
                <Text style={{ color: colorScheme === 'light' ? 'gray' : '#9BA0A6', marginLeft: 4 }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>

    )
}

export default ProfileTag