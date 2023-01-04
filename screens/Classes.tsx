import { View, Text, FlatList, Image, StyleSheet, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import { SHADOWS, SIZES } from '../constants/Theme';
import { auth, db, getData, updateCollection } from '../Firebase/firebase';
import { ProfileButton } from '../components';
import Header from '../components/Header';
import firebase from 'firebase/compat';
import ConfirmationModal from '../components/ConfirmationModal';
import OptionsModal from '../components/OptionsModal';
import Button from '../components/Button';
import { haptics } from '../utils';
import CircleButton from '../components/CircleButton';
import { ActivityBadge } from '../components/ProfileBadges';
import Swiper from 'react-native-swiper';

const Classes = ({ navigation }) => {


    const colorScheme = useColorScheme();
    const [classes, setClasses] = useState([])
    const [school, setSchool] = useState(null)
    const [showClassModal, setShowClassModal] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [schoolClasses, setSchoolClasses] = useState([])
    const [reload, setReload] = useState(false)











    const enterClassroom = (name, id) => {
        db.collection('chatrooms')
            .doc(id)
            .set({
                type: 'class',
                name: name

            }, { merge: true })
        db.collection('chatrooms')
            .doc(id)
            .update({
                users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(auth.currentUser.uid)),

            })

        navigation.navigate('Classroom', {
            id: id,
            name: name

        })

    }
    const updateClasses = (classes) => {
        setClasses(classes)

        classes.forEach((item) => {
            //add each class to user's classes 
            db.collection('users')
                .doc(auth.currentUser.uid)
                .update({
                    classes: firebase.firestore.FieldValue.arrayUnion(
                        db.collection('schools')
                            .doc(school.id)
                            .collection('classes')
                            .doc(item.id))
                })


            //add this user to the class
            db.collection('schools')
                .doc(school.id)
                .collection('classes')
                .doc(item.id)
                .update({
                    users: firebase.firestore.FieldValue.arrayUnion(db.collection(auth.currentUser.uid))
                })


        })
    }

    const deleteClass = () => {

        db.collection('schools').doc(school.id).collection('classes').doc(selectedClass.id)
            .update({
                users: firebase.firestore.FieldValue.arrayRemove({
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL
                })
            })
        db.collection('users').doc(auth.currentUser.uid).collection('classes').doc(selectedClass.id).delete()

        setReload(!reload)

    }


    const routeParams = {
        school: school,
        update: updateClasses,



    }



    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {

            }}
            badgeContainerStyle={{ backgroundColor: Colors.primary, top: '55%', left: '65%' }}
            badge={ActivityBadge()}
            showsName={true}


        />

    )

    const headerRight = () => (

        <CircleButton
            onPress={() => { }}
            style={{ marginLeft: 10 }}
            source={assets.more}
        />

    )


    const onDeletePress = () => {

        setShowClassModal(false);
        setShowConfirmationModal(true);

    }



    useEffect(() => {





        setLoading(true)
        const array = []
        setClasses(array)
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot((doc) => {

                setUser(doc.data())
                getData('schools', doc.data().school.id, setSchool)
                // doc.data().classes.forEach()



                setLoading(false)
            })
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('classes')
            .onSnapshot(snapshot => {
                setClasses(snapshot.docs.map((doc) => (
                    {
                        data: doc.data()
                    }
                )))
            })



        return () => subscriber();


    }, [reload])

    if (loading) {
        return (

            <View>
                <Header
                    title='Classes'
                    headerLeft={headerLeft()}
                    headerRight={headerRight()}
                    style={{ backgroundColor: Colors.primary, height: 170, zIndex: 0 }}
                    textStyle={{ fontSize: SIZES.huge }}
                    navigation={navigation}

                />



                <View style={{ backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 25, marginTop: -30, zIndex: 1, padding: 20, justifyContent: 'cneter', alignItems: 'center' }}>

                    <Image source={assets.loading} style={{ width: 28, height: 28, tintColor: 'gray', marginTop: '50%' }} />
                </View>
            </View>

        )

    }
    else {

        return (



            <View style={{ flex: 1 }}>
                <Button
                    onPress={() => navigation.navigate('AddClasses', { ...routeParams })}
                    style={{ borderRadius: 50, position: 'absolute', bottom: 30, right: 20, zIndex: 1, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                    icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
                />
                <ConfirmationModal
                    onCancelPress={() => setShowConfirmationModal(false)}
                    showModal={showConfirmationModal}
                    onConfirmPress={() => { setShowConfirmationModal(false); deleteClass(); }}
                    message={`Leaving this class means you won't be able to see thier feed or chats anymore.`}
                    cancelText='Cancel'
                    confirmText="Yes, I'm Sure 👍"

                />
                <OptionsModal

                    onOptionPress={[onDeletePress]}
                    options={['Leave Class']}
                    showModal={showClassModal}
                    toValue={-200}
                    onCancelPress={() => setShowClassModal(false)}

                />
                <Header
                    title='Classes'
                    headerLeft={headerLeft()}
                    headerRight={headerRight()}
                    style={{ backgroundColor: Colors.primary, height: 170, zIndex: 0 }}
                    navigation={navigation}

                />



                <View style={{ backgroundColor: Colors[colorScheme].background, height: '80%', borderRadius: 15, marginTop: -30, padding: 10 }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={school?.logo ? school.logo : assets.school} style={{ width: 20, height: 20, tintColor: 'gray' }} />
                        <Text style={{ margin: 10, fontFamily: 'Kanit', fontSize: 16, color: 'gray' }}>{school?.name}</Text>
                    </View>

                    {classes.length > 0 &&
                        <FlatList
                            bounces={false}
                            data={classes}
                            renderItem={({ item }) =>
                                <ClassListItem
                                    onPress={() => enterClassroom(item.data.name, item.data.id)}
                                    Class={item.data}
                                    onLongPress={() => {
                                        haptics('light')
                                        setShowClassModal(true);
                                        setSelectedClass(item.data)
                                    }}
                                />}
                            keyExtractor={(item) => item.id}

                        />
                    }
                    {school && !classes.length && <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', height: '75%' }}>


                        <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`This is where all your classes for ${school?.name} will appear.`}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`Tap   `}</Text>

                            <Image source={assets.add} style={{ width: 15, height: 15, tintColor: Colors.primary }} />
                            <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{` to start adding classes! `}</Text>

                        </View>



                    </View>}

                    {!school && <View style={{ marginTop: 30, alignItems: 'center', width: '100%' }}>
                        <Text style={{ fontFamily: 'Kanit', color: 'gray', textAlign: 'center', }}>{'Oops! \nYou are not in a school yet.'}</Text>
                        <Button
                            background={'white'}
                            title={'Join a School'}
                            tint={'black'}
                            onPress={() => navigation.navigate('SchoolSettings', { school: null })}
                        />

                    </View>}




                </View>
            </View >



        )
    }
}
export default Classes