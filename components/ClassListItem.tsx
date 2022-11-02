import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import { ChatRoom, Class } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ClassProfileCircle from './ClassProfileCircle'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'

export type ClassListItemProps = {
    Class: Class;
    chatRoom: ChatRoom;
}
const ClassListItem = (props: ClassListItemProps) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const { Class, chatRoom } = props;
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']
    const onPress = () => {
        navigation.navigate('Chats', { class: Class })

    }




    return (


        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ marginBottom: 20 }}>


                <View style={{ backgroundColor: colorScheme === 'light' ? 'white' : 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2 }}>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ margin: 10 }}>
                            <ClassProfileCircle Class={Class} story={[]} showStoryBoder={false} size={40} showName bold chatRoom={chatRoom} />

                        </View>
                        <View>
                            <Text style={[styles.className, { color: Colors[colorScheme].accent }]}>{Class.name} </Text>

                            <ActivePeople userCount={Class.users.length} activeCount={3} />

                        </View>

                    </View>

                </View>

                <View style={[styles.container, { ...SHADOWS[colorScheme], backgroundColor: colorScheme === 'light' ? '#F2F2F2' : '#F2F2F2', shadowColor: '#272727' }]}>

                    <Text style={{ fontFamily: 'KanitMedium', fontSize: 20, color: 'lightgray' }}>No Recent Activity</Text>

                </View>
            </View>


        </TouchableWithoutFeedback>

    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },




    messageContent: {
        marginLeft: 10
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: -1,

        shadowRadius: 2,
        shadowColor: '#272727',
        justifyContent: 'center'

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit'



    }
})
export default ClassListItem