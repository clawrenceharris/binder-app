import { View, Text, FlatList, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import ModalComponent from '../components/Modal';
import { SHADOWS } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { auth, db, updateCollection } from '../Firebase/firebase';
import { UserProfileCircle } from '../components';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/compat';
export default function ClassesScreen({ currentUser }) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const [classes, setClasses] = useState([])
    const [school, setSchool] = useState(null)
    const [schoolID, setSchoolID] = useState('')


    const updateClasses = (classes) => {
        setClasses(classes)

        //add each selected class to the users list of classes in the collection
        classes.forEach((item) => {
            updateCollection('users', auth.currentUser.uid, { classes: firebase.firestore.FieldValue.arrayUnion(item) });

        })
    }

    const defaultData = {
        id: faker.datatype.uuid(),
        description: null,
        startDate: new Date(),
        endDate: new Date(),
        building: null,
        room: null,
        teacher: null,
        users: null,
        announcements: null,
    }

    const routeParams = {
        title: 'Add Classes',
        defaultData: defaultData,
        data: school?.classes,
        selectionLimit: 10,
        update: updateClasses,
        isClass: true

    }
    const headerRight = () => (
        <UserProfileCircle user={auth.currentUser} size={40} showName={false} showStoryBoder bold={false} showStudyBuddy={false} showActive />

    )
    const headerLeft = () => (
        <Image source={assets.create} style={{ width: 30, height: 30, tintColor: Colors[colorScheme].background }} />

    )
    useEffect(() => {
        const array = []
        const subscriber = db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc => {
            setClasses(doc.data().classes);
            setSchoolID(doc.data().schoolID)
            db.collection('schools').doc(doc.data().schoolID).onSnapshot(doc => {
                setSchool(doc.data())

            });


        })

        return () => {
            subscriber()

        }
    }, [])

    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }} >
            <Header
                title='Classes'
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                shadow
                navigation={navigation}

            />

            <ScrollView style={{ padding: 10 }}>
                {school != null ? <View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={school?.logo ? school.logo : assets.school} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />
                            <Text style={{ margin: 10, fontFamily: 'KanitSemiBold', fontSize: 16, color: Colors.light.primary }}>{school?.name}</Text>
                        </View>


                        <TouchableOpacity
                            onPress={() => navigation.navigate('SearchSelect', { ...routeParams })}
                            style={{ padding: 5, backgroundColor: Colors.light.accent, borderRadius: 50, flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={assets.add_class} style={{ width: 20, height: 20, tintColor: 'white' }} />

                            <Text style={{ fontFamily: 'Kanit', color: 'white' }}>Add Classes</Text>

                        </TouchableOpacity>
                    </View>
                    {

                        classes?.length > 0 ?
                            <FlatList
                                data={classes}
                                renderItem={({ item }) => <ClassListItem Class={item} />}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                scrollEnabled={false}

                            />
                            :

                            <View style={{ ...SHADOWS.dark, width: '100%', borderRadius: 15, backgroundColor: '#5B5B5B', padding: 10, alignItems: 'center', justifyContent: 'center' }}>

                                <View>
                                    <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`📚 This is where all your classes for ${school.name} will appear.`}</Text>
                                    <View style={{ backgroundColor: Colors.light.primary }}>

                                    </View>
                                </View>
                            </View>

                    }

                </View > : <></>}


            </ScrollView>


        </View >


    )
}