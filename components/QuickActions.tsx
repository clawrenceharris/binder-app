import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import useColorScheme from '../hooks/useColorScheme'


//route.params = class , user
const QuickActions = ({ route }) => {
    const navigation = useNavigation()
    const colorScheme = useColorScheme()
    const onChatPress = async () => {
        navigation.goBack()

        { route.params.class && navigation.navigate('ChatRoom', { class: route.params.class, chatRoom: route.params.class.chatRooms[0] }) }

    }

    const onCameraPress = () => {
        navigation.goBack()

        { route.params.class && navigation.navigate('Camera', { class: route.params.class, chatRoom: route.params.class.chatRooms[0] }) }
        { route.params.user && navigation.navigate('Camera', { class: route.params.class, chatRoom: route.params.class.chatRooms[0] }) }

    }
    return (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TouchableOpacity style={[styles.btnContainer, { ...SHADOWS[colorScheme], backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#1F1F1F', shadowColor: '#272727' }]} onPress={onChatPress}>
                <Image source={assets.chat} style={[styles.icon, { tintColor: Colors.dark.tint }]} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, { ...SHADOWS[colorScheme], backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#1F1F1F', shadowColor: '#272727' }]} onPress={onCameraPress}>
                <Image source={assets.camera} style={[styles.icon, { tintColor: Colors.dark.tint }]} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, { ...SHADOWS[colorScheme], backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#1F1F1F', shadowColor: '#272727' }]}>
                <Image source={assets.video_call} style={[styles.icon, { tintColor: Colors.dark.tint }]} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, { ...SHADOWS[colorScheme], backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#1F1F1F', shadowColor: '#272727' }]}>
                <Image source={assets.phone} style={[styles.icon, { tintColor: Colors.dark.tint }]} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    icon: {
        width: 28,
        height: 28,
        tintColor: '#424242'

    },

    btnContainer: {
        borderRadius: 20,
        padding: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#272727'
    },
})
export default QuickActions