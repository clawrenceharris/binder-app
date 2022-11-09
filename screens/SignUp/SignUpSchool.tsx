import { View, Text, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../../constants'
import useColorScheme from '../../hooks/useColorScheme'
import { useRoute } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { db } from '../../Firebase/firebase'
import { faker } from '@faker-js/faker'
import Button from '../../components/Button'

const SignUpSchool = ({ navigation }) => {
    const route = useRoute()
    const [school, setSchool] = useState(null)
    const [data, setData] = useState([])

    console.log(school)

    const defaultData = {
        id: faker.datatype.uuid(),
        scheduleType: null,
        logo: '',
        location: null,
        users: null,
        active: null


    }

    const routeParams = {
        title: 'Add Schools',
        defaultData: defaultData,
        data: data,
        selectionLimit: 1,
        isClass: false
    }

    const onNextPressed = () => {

        navigation.navigate('SignUpPhoto', { ...route.params, school: school })
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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 30 }}>

                <Text style={styles.screenTitle}>{"What school do you go to?"}</Text>
                <Text style={styles.description}>{descriptions.school}</Text>
                <View style={{ alignItems: 'flex-start', width: '100%', marginTop: 30 }}>

                    {!school ? <TouchableOpacity
                        onPress={() => { navigation.navigate('SearchSelect', { ...routeParams, update: setSchool }) }}
                        style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={assets.school} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>Select a School</Text>
                    </TouchableOpacity>

                        :
                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('SearchSelect', { ...routeParams, update: setSchool })
                                }}
                                style={{ flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={assets.pencil} style={{ width: 20, height: 20, tintColor: 'white' }} />
                                <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{school.name}</Text>
                            </TouchableOpacity>


                        </View>

                    }


                </View>


                <View style={{ alignItems: 'center' }}>
                    <Button
                        title={'Continue'}
                        condition={school != null}
                        background={Colors.light.primary}
                        tint={'white'}
                        margin={styles.continueBtn.marginTop}
                        onPress={onNextPressed}
                        width={styles.continueBtn.width}

                    />
                </View>

            </View>
        </SafeAreaView>
    )
}




export default SignUpSchool

