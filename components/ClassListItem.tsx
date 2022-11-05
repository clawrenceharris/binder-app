import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { chatroom, Class } from '../types'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ClassProfileCircle from './ClassProfileCircle'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { auth, db } from '../Firebase/firebase'


const ClassListItem = ({ Class }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']
    const [totalUsers, setTotalUsers] = useState(0)


    const onPress = () => {
        navigation.navigate('Chats', { class: Class })

    }


    useEffect(() => {
        //if the users 
        const subscriber = db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc => {

            db.collection('schools').doc(doc.data().schoolID)
                .onSnapshot(doc =>
                    doc.data().users.forEach(user => {
                        //console.log(user.data().classes.filter(item => item === Class).length)

                        console.log(user)
                    }))




        })
        return () => {
            subscriber()
        }
    }, [])


    return (


        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ marginBottom: 20 }}>


                <View style={{ backgroundColor: colorScheme === 'light' ? 'white' : 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2 }}>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ margin: 10 }}>
                            <ClassProfileCircle Class={Class} story={[]} showStoryBoder={false} size={40} showName bold chatroom={Class.chatroom} />

                        </View>
                        <View>
                            <Text style={[styles.className, { color: Colors.light.accent }]}>{Class.name}</Text>

                            <ActivePeople userCount={totalUsers} activeCount={3} />

                        </View>

                    </View>

                </View>

                <View style={[styles.container, { ...SHADOWS.dark, backgroundColor: colorScheme === 'light' ? '#F2F2F2' : '#F2F2F2', shadowColor: '#272727' }]}>

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