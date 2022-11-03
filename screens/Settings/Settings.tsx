import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/firebase'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../../components/BackButton'
import { assets } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import SettingsListItem from '../../components/SettingsListItem'
import {
    ref,
    onValue,
    push,
    update,
    remove
} from 'firebase/database';
import moment from 'moment'
import Header from '../../components/Header'
const Settings = () => {
    const [userData, setUserData] = useState(null)
    const [docId, setdocId] = useState('')
    const navigation = useNavigation()

    const signOut = () => {
        auth.signOut().then(() => {
            navigation.navigate('Login')
        }).catch((error) => {

        })
    }
    useEffect(() => {
        console.log("USE EFFECT")
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                setUserData(doc.data())

            })



        return () => subscriber()

    }, [userData])

    function onSubmit(newData) {
        db.collection('users').doc(docId).update({ ...userData, ...newData })
    }
    function getUserData() {
        db.collection('users').onSnapshot(querySnapshot => {
            querySnapshot.forEach(documentSnapshot => {
                if (documentSnapshot.data().uid == auth.currentUser.uid) {
                    setUserData(documentSnapshot.data())
                    setdocId(documentSnapshot.id)
                }
            })
        })
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Settings'}
                shadow

            />

            <ScrollView style={{ paddingHorizontal: 10 }}>
                <View style={{ paddingVertical: 20 }}>

                </View>
                <View style={{ width: '100%', backgroundColor: '#333', borderRadius: 10 }}>

                    <SettingsListItem
                        title='Name'
                        value={auth.currentUser?.displayName}
                        onPress={() => { navigation.navigate('NameSettings', { firstName: userData?.firstName, lastName: userData?.lastName }) }}
                    />


                    <SettingsListItem
                        title='Birthday'
                        value={moment(userData?.birthday?.toDate())?.format('MMM DD, YYYY')}
                        onPress={() => { navigation.navigate('BirthdaySettings', { value: userData?.birthday }) }}
                    />


                    <SettingsListItem
                        title='Email'
                        value={auth.currentUser?.email}
                        titleColor={!auth.currentUser.emailVerified ? 'red' : 'white'}
                        onPress={() => navigation.navigate('EmailSettings', { value: auth.currentUser.email })}
                    />




                    <SettingsListItem
                        title='School'

                        value={userData?.school?.name}
                        onPress={() => navigation.navigate('SchoolSettings', { school: userData?.school, secondSchool: userData?.secondSchool })}

                    />

                    <SettingsListItem
                        title='GPA'
                        value={userData?.gpa}
                        onPress={() => navigation.navigate('GPASetttings')}

                    />

                    <SettingsListItem
                        title='Password'
                        onPress={() => navigation.navigate('PasswordSettings', { value: '' })}

                    />
                </View>

            </ScrollView>

        </View>
    )
}

export default Settings