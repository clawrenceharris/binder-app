import { View, Text, FlatList, Image, StyleSheet, ScrollView, LogBox, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import ModalComponent from '../components/Modal';
import { SHADOWS, SIZES } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { auth, db, getData, getDataSnapshot, getSchool, getUser, getUserSchool, getUserSnapshot, updateCollection } from '../Firebase/firebase';
import { ProfileButton } from '../components';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/compat';
import ClassListItemModal from '../components/ClassListItemModal';
import ConfirmationModal from '../components/ConfirmationModal';
import * as Haptics from 'expo-haptics'
import OptionsModal from '../components/OptionsModal';
import ClassOptionsModal from '../components/ClassOptionsModal';
import Button from '../components/Button';
import { haptics } from '../utils';
import MoreButton from '../components/MoreButton';
import CircleButton from '../components/CircleButton';
import { ActivityBadge } from '../components/ProfileBadges';

export default function ClassesScreen({ navigation }) {

    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
    ])

    const colorScheme = useColorScheme();
    const [classes, setClasses] = useState([])
    const [school, setSchool] = useState(null)
    const [showClassModal, setShowClassModal] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [schoolClasses, setSchoolClasses] = useState([])
    const openChatroom = (item) => {
        db.collection('chatrooms')
            .doc(item?.id)
            .get()
            .then(doc => {
                if (doc.exists) {
                    db.collection('chatrooms')
                        .doc(item.id)
                        .update({
                            users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid))
                        })
                }

                else {
                    db.collection('chatrooms')
                        .doc(item.id)
                        .set({
                            id: item.id,
                            type: 'class',
                            name: item?.name,
                            users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid)),
                            messages: []
                        })
                }
            })
        navigation.navigate('Classroom', { chatroomID: item.id })

    }
    const updateClasses = (classes) => {
        setClasses(classes)
        classes.forEach((item) => {
            //add each class to user's classes 
            updateCollection('users', auth.currentUser.uid, { classes: firebase.firestore.FieldValue.arrayUnion(db.collection('classes').doc(item.id)) });

            //add this user to the class
            updateCollection('classes', item.id, { users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid)) });

        })
    }

    const deleteClass = () => {
        updateCollection('classes', selectedClass.id, { users: firebase.firestore.FieldValue.arrayRemove(user) });
        updateCollection('users', auth.currentUser.uid, { classes: firebase.firestore.FieldValue.arrayRemove(db.collection('classes').doc(selectedClass.id)) });

    }


    const routeParams = {
        school: school,
        update: updateClasses,



    }



    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {
                navigation.openDrawer()
            }}
            badgeContainerStyle={{ backgroundColor: Colors.light.accent, top: '55%', left: '65%' }}
            badge={ActivityBadge()}
            showsName={true}


        />

    )

    const headerRight = () => (
        <View style={{ flexDirection: 'row' }}>
            <CircleButton
                onPress={() => navigation.navigate('AddClasses', { ...routeParams })}
                source={assets.add}
                style={undefined}
            />
            <CircleButton
                onPress={() => { }}
                style={{ marginLeft: 10 }}
                source={assets.more}
            />
        </View>
    )


    const onDeletePress = () => {

        setShowClassModal(false);
        setShowConfirmationModal(true);

    }


    const onMutePress = () => {

        setShowClassModal(false);

    }

    const onPinPress = () => {


    }
    console.log("LENGTH IN CLASSES SCREEN", classes?.length)
    useEffect(() => {
        const userClasses = []
        const schoolClasses = []
        setLoading(true)
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {
                setUser(doc.data())
                getData('schools', doc.data().school.id, setSchool)
                // doc.data().classes.forEach()
                doc.data().classes.forEach(item => {
                    db.collection('classes')
                        .doc(item.id)
                        .get()
                        .then(doc => {
                            userClasses.push(doc.data())
                            setClasses(userClasses)

                        })
                })

                setLoading(false)
            })


        return () => subscriber()




    }, [])


    return (

        <View style={{ flex: 1 }}>

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
                style={{ backgroundColor: Colors.light.accent, height: 200, zIndex: 0 }}
                textStyle={{ fontSize: SIZES.huge }}
                navigation={navigation}

            />



            <View style={{ backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 25, marginTop: -30, zIndex: 1, padding: 20 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={school?.logo ? school.logo : assets.school} style={{ width: 20, height: 20, tintColor: 'gray' }} />
                    <Text style={{ margin: 10, fontFamily: 'Kanit', fontSize: 16, color: 'gray' }}>{school?.name}</Text>
                </View>

                {classes.length > 0 && <FlatList
                    data={classes}
                    renderItem={({ item }) =>
                        <ClassListItem
                            onPress={() => openChatroom(item)}
                            Class={item}
                            onLongPress={() => {
                                haptics('light')
                                setShowClassModal(true);
                                setSelectedClass(item)
                            }}
                        />}
                    keyExtractor={(item) => item.id}

                />
                }
                {school && !classes.length && <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', height: '75%' }}>


                    <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`This is where all your classes for ${school?.name} will appear.`}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`Tap   `}</Text>

                        <Image source={assets.add} style={{ width: 15, height: 15, tintColor: Colors.light.accent }} />
                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{` to start adding classes! `}</Text>

                    </View>



                </View>}

                {!school && <View style={{ marginTop: 30, alignItems: 'center', width: '100%' }}>
                    <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center', }}>{'Whoops! \nYou are not in a school yet.'}</Text>
                    <Button
                        background={'white'}
                        title={'Join a School'}
                        onPress={() => navigation.navigate('SchoolSettings', { school: null })}
                    />

                </View>}




            </View>
        </View >


    )
}