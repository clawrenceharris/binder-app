import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { db } from '../../Firebase/firebase'
import { faker } from '@faker-js/faker'
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'

const SignUpSchool = ({ navigation }) => {
    const route = useRoute()
    const [school, setSchool] = useState(null)
    const [data, setData] = useState([])


    const defaultData = {
        id: faker.datatype.uuid(),
        scheduleType: null,
        logo: '',
        location: null,
        users: null,
        active: null


    }


    const onNextPressed = () => {

        navigation.navigate('SignUpPhoto', { ...route.params, school: school[0] })
    }


    useEffect(() => {
        const subscriber = db.collection('schools')

            .onSnapshot(querySnapshot => {
                const array = []

                querySnapshot.forEach(documentSnapshot => {

                    array.push(
                        {
                            ...documentSnapshot.data(),
                        })

                })

                setData(array)
            })
        return () => {
            subscriber()
        }
    }, [])

    const onBackPressed = () => {
        navigation.goBack()
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>

            <Header
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}
            />
            <Text style={styles.screenTitle}>{"What school do you go to?"}</Text>

            <View style={{ padding: 30, justifyContent: 'space-evenly' }}>

                <Text style={styles.description}>{descriptions.school}</Text>
                <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>

                    {!school ? <TouchableOpacity
                        onPress={() => { navigation.navigate('AddSchool', { update: setSchool }) }}
                        style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: '#00000070', borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={assets.school} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{"Select a School"}</Text>
                    </TouchableOpacity>

                        :
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AddSchool', { update: setSchool })
                                }}
                                style={{ flexDirection: 'row', backgroundColor: '#00000070', borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={assets.pencil} style={{ width: 20, height: 20, tintColor: 'white' }} />
                                <Text style={{ fontSize: 20, fontFamily: 'KanitMedium', color: 'white', marginLeft: 10 }}>{school[0]?.name}</Text>
                            </TouchableOpacity>


                        </View>

                    }


                </View>


                <Button
                    title={'Continue'}
                    onPress={onNextPressed}
                    style={{ borderRadius: 15, margin: 40 }}
                    disabled={!school}
                />


            </View>
        </View>
    )
}




export default SignUpSchool

