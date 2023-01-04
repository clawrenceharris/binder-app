import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/firebase'
import { useNavigation } from '@react-navigation/native'
import SettingsListItem from '../../components/SettingsListItem'
import moment from 'moment'
import Header from '../../components/Header'
import Button from '../../components/Button'
import { Colors } from '../../constants'
import { SHADOWS } from '../../constants/Theme'

const Settings = ({ navigation }) => {
    const [userData, setUserData] = useState(null)
    const [schoolData, setSchoolData] = useState(null)
    const [secondSchoolData, setSecondSchoolData] = useState(null)



    const onLogoutPress = async () => {
        //TODO: log user out using firebase

        try {
            await auth.signOut();
            navigation.pop()
            navigation.replace('StartScreen');
        } catch (e) {
            console.log(e);
        }


    }


    useEffect(() => {
        //get and set the user data and the user's school data
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {
                setUserData(doc.data())
                if (doc.data().school)
                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .get()
                        .then((doc) => {
                            setSchoolData(doc.data())
                        })
            })

        return () => subscriber()

    }, []);



    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Settings'}
                style={{ backgroundColor: Colors.primary }}

            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 10 }}
            >

                <View style={styles.sectionContainer}>


                    <Text style={styles.sectionTitle}>{'Account Settings'}</Text>
                    <SettingsListItem
                        title='Name'
                        value={auth.currentUser?.displayName}
                        isTop={true}
                        onPress={() => { navigation.navigate('NameSettings', { displayName: userData.displayName }) }}
                    />


                    <SettingsListItem
                        title='Birthday'
                        value={moment(userData?.birthday?.toDate())?.format('MMM DD, YYYY')}
                        onPress={() => { navigation.navigate('BirthdaySettings', { value: userData.birthday }) }}
                    />


                    <SettingsListItem
                        title='Email'
                        value={auth.currentUser?.email}
                        titleColor={!auth.currentUser.emailVerified ? Colors.light.red : 'white'}
                        onPress={() => navigation.navigate('EmailSettings', { value: auth.currentUser.email })}
                    />

                    <SettingsListItem
                        title='Password'
                        isBottom={true}
                        onPress={() => navigation.navigate('PasswordSettings')}

                    />

                </View>


                <View style={styles.sectionContainer}>

                    <Text style={styles.sectionTitle}>{'School Settings'}</Text>

                    <SettingsListItem
                        title='School'
                        value={schoolData?.name}
                        onPress={() => navigation.navigate('SchoolSettings', { school: schoolData })}
                        isTop={true}

                    />

                    <SettingsListItem
                        title='Graduation Year'
                        value={userData?.gradYear}
                        onPress={() => navigation.navigate('GraduationYearSettings')}

                    />

                    <SettingsListItem
                        title='GPA'
                        value={userData?.gpa}
                        onPress={() => navigation.navigate('GPASettings', { value: userData?.gpa })}
                        isBottom={true}

                    />

                </View>


                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{'Desk Settings'}</Text>

                    <SettingsListItem
                        title='Desk Privacy'
                        onPress={() => navigation.navigate('DeskPrivacy')}
                        isTop
                        isBottom
                    />




                </View>



                <Button
                    title={'Log Out'}
                    backgroundColor={Colors.light.red}
                    tint={'white'}
                    width={'100%'}
                    onPress={onLogoutPress}
                    margin={20}
                    condition={true}
                />


            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    sectionContainer: {
        marginVertical: 15,
        ...SHADOWS.dark,
        shadowColor: '#870290'

    },

    sectionTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 16,
        color: 'white',
        marginBottom: 10,
    }
})

export default Settings