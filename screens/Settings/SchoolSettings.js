import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Button from '../../components/Button'
import { AddUserToSchool, auth, db } from '../../Firebase/firebase'
import Header from '../../components/Header'
import { faker } from '@faker-js/faker'
import ConfirmationModal from '../../components/ConfirmationModal'

const SchoolSettings = ({ route }) => {
    const navigation = useNavigation()
    const [school, setSchool] = useState(route.params.school)
    const [data, setData] = useState([])
    const [showModal, setShowModal] = useState(false)
    const defaultData = {
        id: faker.datatype.uuid(),
        scheduleType: null,
        logo: '',
        location: null,
        users: null,
        active: null,
    }

    const routeParams = {
        title: 'Add Schools',
        defaultData: defaultData,
        data: data,
        selectionLimit: 1,
        isClass: false
    }
    const onSavePress = () => {
        AddUserToSchool(school.id, auth.currentUser.uid)
        navigation.goBack()
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


    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <ConfirmationModal
                onCancelPress={() => setShowModal(false)}
                showModal={showModal}
                onConfirmPress={onSavePress}
                message={`Saving this school means you will leave ${route.params?.school?.name} and you won't be able to see their feed or chats anymore.`}
                cancelText="Cancel"
                confirmText="Yes, I'm Sure 👍"

            />

            <Header
                title='School'
                navigation={navigation}
                direction='horizontal'

            />
            <View style={styles.mainContainer}>

                <Text style={styles.description}>{descriptions.school}</Text>

                <View style={{ marginTop: 30 }}>

                    {!school ? <TouchableOpacity
                        onPress={() => { navigation.navigate('SearchSelect', { ...routeParams, update: setSchool }) }}
                        style={{ alignSelf: 'center', flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                        <Image source={assets.school} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>Select a School</Text>
                    </TouchableOpacity>

                        :

                        <View style={{ alignSelf: 'center' }}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('SearchSelect', { ...routeParams, update: setSchool }) }}
                                style={{ flexDirection: 'row', backgroundColor: Colors.light.accent, borderRadius: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={assets.pencil} style={{ width: 20, height: 20, tintColor: 'white' }} />
                                {school && <Text style={{ fontSize: 20, fontFamily: 'KanitBold', color: 'white', marginLeft: 10 }}>{school?.name}</Text>}
                            </TouchableOpacity>


                        </View>

                    }

                </View>


                <Button
                    width={'100%'}
                    background={Colors.light.primary}
                    tint={'white'}
                    title={'Save'}
                    margin={30}
                    condition={school != route.params.school}
                    onPress={() => {
                        if (route.params.school != null)
                            setShowModal(true)
                        else
                            onSavePress()
                    }}
                />
            </View>



        </View>
    )
}

export default SchoolSettings