import { View, Text, FlatList, Image, StyleSheet, ScrollView, LogBox, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import ModalComponent from '../components/Modal';
import { SHADOWS } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { auth, db, getSchool, getUser, getUserSchool, getUserSnapshot, updateCollection } from '../Firebase/firebase';
import { UserProfileCircle } from '../components';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/compat';
import ClassListItemModal from '../components/ClassListItemModal';
import ConfirmationModal from '../components/ConfirmationModal';
import * as Haptics from 'expo-haptics'
import OptionsModal from '../components/OptionsModal';
import ClassOptionsModal from '../components/ClassOptionsModal';

export default function ClassesScreen({ currentUser }) {

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
    ])

    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    const [classes, setClasses] = useState([])
    const [school, setSchool] = useState(null)
    const [showClassModal, setShowClassModal] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const updateClasses = (classes) => {
        setClasses(classes)
        classes.forEach((item) => {
            //add each class to user's classes 
            updateCollection('users', auth.currentUser.uid, { classes: firebase.firestore.FieldValue.arrayUnion(db.collection('classes').doc(item.id)) });
            db.collection('chatrooms')
                .doc(item.id)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid)
                })
            //add this user to the class
            updateCollection('classes', item.id, { users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid)) });

        })
    }

    const deleteClass = () => {
        updateCollection('classes', selectedClass.id, { users: firebase.firestore.FieldValue.arrayRemove(user) });
        updateCollection('users', auth.currentUser.uid, { classes: firebase.firestore.FieldValue.arrayRemove(db.collection('classes').doc(selectedClass.id)) });

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
    // console.log(school?.classes)
    const routeParams = {
        title: 'Add Classes',
        defaultData: defaultData,
        data: school?.classes,
        selectionLimit: 10,
        update: updateClasses,
        isClass: true

    }
    const headerLeft = () => (
        <UserProfileCircle
            user={auth.currentUser}
            size={40} showName={false}
            showStoryBoder bold={false}
            showStudyBuddy={false}
            showActive
            navigation={navigation}
        />

    )





    const headerRight = () => (
        <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />

        </TouchableOpacity>

    )


    const onDeletePress = () => {

        setShowClassModal(false);
        setShowConfirmationModal(true);

    }


    const onMutePress = () => {

        setShowClassModal(false);

    }

    const onPinPress = () => {

        setShowClassModal(false);

    }

    useEffect(() => {
        console.log("first")
        setLoading(true)
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {
                setUser(doc.data())
                setClasses(doc.data().classes)

                if (doc.data().school) {
                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .get()
                        .then((doc) => {
                            setSchool(doc.data())
                            setLoading(false)
                        }).catch((error) => console.log(error))
                }
            })


        return () => subscriber()




    }, [])

    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }} >
            <ConfirmationModal
                onCancelPress={() => setShowConfirmationModal(false)}
                showModal={showConfirmationModal}
                onConfirmPress={() => { setShowConfirmationModal(false); deleteClass(); }}
                message={`Leaving this class means you won't be able to see thier feed or chats anymore.`}
                cancelText='Cancel'
                confirmText="Yes, I'm Sure 👍"

            />
            <ClassOptionsModal
                showModal={showClassModal}
                onPinPress={onPinPress}
                onLeavePress={onDeletePress}
                onMutePress={onMutePress}
                toValue={-300}
                onCancelPress={() => setShowClassModal(false)}

            />
            <Header
                title='Classes'
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                shadow
                navigation={navigation}

            />

            <ScrollView
                style={{ padding: 10 }}

            >
                {school != null ?
                    <View>

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
                                classes.map((item) =>
                                    <View key={item.id}>
                                        <ClassListItem
                                            Class={item}
                                            onLongPress={() => {
                                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                                setShowClassModal(true);
                                                setSelectedClass(item)
                                            }}
                                        />
                                    </View>

                                )

                                :

                                <View style={{ ...SHADOWS.dark, width: '100%', borderRadius: 15, backgroundColor: '#5B5B5B', padding: 10, alignItems: 'center', justifyContent: 'center' }}>

                                    <View>
                                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`📚 This is where all your classes for ${school?.name} will appear.`}</Text>
                                        <View style={{ backgroundColor: Colors.light.primary }}>

                                        </View>
                                    </View>
                                </View>

                        }

                    </View > : <Text>You are not in a school yet.</Text>}


            </ScrollView>


        </View >


    )
}