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
import { auth, db, updateCollection } from '../Firebase/firebase'
import firebase from 'firebase/compat'

const ClassListItem = ({ Class, onLongPress }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [longPressed, setLongPressed] = useState(false)
    const snapPoints = ['40%', '15%', '100%']
    const [classData, setClassData] = useState(null)
    const onPress = () => {
        navigation.navigate('Classroom', { Class: Class })
    }
    const date = new Date().getMinutes()

    useEffect(() => {
        //if this class id is equal to the users class id
        const subscriber = db.collection('classes').doc(Class.id).onSnapshot(doc => {
            setClassData(doc.data())

            //update active users
            doc.data().users?.forEach((user) => {

                db.collection('users').doc(user.id)
                    .onSnapshot(doc => {

                        if (doc.data()?.lastActive.toDate().getMinutes() <= 2) {
                            updateCollection('classes', Class.id, { active: firebase.firestore.FieldValue.arrayUnion(user) })
                        } else {
                            updateCollection('classes', Class.id, { active: firebase.firestore.FieldValue.arrayRemove(user) })

                        }
                    })
            })

        })

        return () => {
            subscriber()
        }
    }, [])


    return (


        <TouchableWithoutFeedback
            onPress={onPress}
            onLongPress={() => onLongPress(Class)}
        >
            <View style={{ marginBottom: 20 }}>
                <View style={{ backgroundColor: 'white', borderTopRightRadius: 25, borderTopLeftRadius: 25, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2 }}>
                    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ margin: 10 }}>
                            <ClassProfileCircle Class={Class} story={[]} showStoryBoder={false} size={40} showName bold chatroom={Class.chatroom} />

                        </View>
                        <View>
                            <Text style={[styles.className, { color: Colors.light.accent }]}>{classData?.name}</Text>

                            <ActivePeople userCount={classData?.users?.length} activeCount={classData?.active?.length} />

                        </View>

                    </View>

                </View>

                <View style={[styles.container, { ...SHADOWS.dark, backgroundColor: '#F2F2F2', shadowColor: '#272727' }]}>

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