import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/firebase'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../../components/BackButton'
import { assets } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import SettingsListItem from '../../components/SettingsListItem'

import moment from 'moment'
import Header from '../../components/Header'
import ToggleButton from '../../components/ToggleButton'
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


                <View style={styles.settingsSectionContainer}>


                    <Text style={styles.sectionTitle}>Account Settings</Text>
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
                        title='Password'
                        onPress={() => navigation.navigate('PasswordSettings', { value: '' })}

                    />

                </View>



                <View style={styles.sectionContainer}>

                    <Text style={styles.sectionTitle}>School Settings</Text>



                    <SettingsListItem
                        title='School'

                        value={userData?.school?.name}
                        onPress={() => navigation.navigate('SchoolSettings', { school: userData?.school, secondSchool: userData?.secondSchool })}

                    />

                    <SettingsListItem
                        title='Graduation Year'
                        value={userData?.gradYear}
                        onPress={() => navigation.navigate('GraduationYearSettings')}

                    />

                    <SettingsListItem
                        title='GPA'
                        value={userData?.gpa}
                        onPress={() => navigation.navigate('GPASettings')}

                    />

                </View>


                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Desk Settings</Text>

                    <SettingsListItem
                        title='Desk Privacy'
                        onPress={() => navigation.navigate('DeskPrivacy')}

                    />

                </View>






            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    sectionContainer: {
        marginVertical: 30
    },

    sectionTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    }
})

export default Settings