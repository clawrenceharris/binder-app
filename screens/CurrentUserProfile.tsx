import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import { ProfileButton } from '../components'
import { SHADOWS } from '../constants/Theme'
import { DrawerActions } from '@react-navigation/native'
import ProfileTag from '../components/ProfileTag'
import ModalComponent from '../components/Modal'
import moment from 'moment'
import { auth, db, updateCollection, updateUserProfile } from '../Firebase/firebase'
import { getZodiacSign, openMediaLibrary } from '../utils'
import EditNameModal from '../components/EditNameModal'
import OptionsModal from '../components/OptionsModal'
import Header from '../components/Header'
import { NewImageBadge } from '../components/ProfileBadges'


const CurrentUserProfile = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)
    const [showEditNameModal, setShowEditNameModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const colorScheme = useColorScheme()
    const user = auth.currentUser

    console.log(userData)
    useEffect(() => {
        const subscriber = db.collection('users')
            .doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                setUserData(doc.data())


            })

        return () => subscriber()
    }, [])







    const birthdayModal = () => (
        <View style={{ alignItems: 'center' }}>
            <View style={[styles.emojiContainer, { ...SHADOWS[colorScheme] }]}>
                <Text style={{ fontSize: 36 }}>🎂</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: Colors[colorScheme].tint }}>{"Birthday"}</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>{`Your birthday is on ${moment(userData?.birthday?.toDate()).format("MMM DD, YYYY")}!`}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false); console.log("press") }}
                style={{ height: 50, backgroundColor: '#00000020', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.accent, fontFamily: 'KanitMedium', fontSize: 20 }}>{"Close"}</Text>
            </TouchableOpacity>


        </View>
    );



    const zodiacSignModal = () => (

        <View style={{ alignItems: 'center' }}>
            <View style={[styles.emojiContainer, { ...SHADOWS[colorScheme] }]}>
                <Text style={{ fontSize: 36 }}>{getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth(), true)}</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: Colors[colorScheme].tint }}>{"Astrology"}</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>
                    {`You are a ${getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth())}!`}
                </Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: '#00000020', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.accent, fontFamily: 'KanitMedium', fontSize: 20 }}>{"Close"}</Text>
            </TouchableOpacity>


        </View>


    );


    const classModal = () => (
        <View style={{ alignItems: 'center' }}>
            <View style={[styles.emojiContainer, { ...SHADOWS[colorScheme] }]}>

                <Text style={{ fontSize: 36 }}>🎓</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: Colors[colorScheme].tint }}>{"Graduating Class"}</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: '#999999' }}>{`You graduate in ${userData?.gradYear}`}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: '#00000020', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.accent, fontFamily: 'KanitMedium', fontSize: 20 }}>{"Close"}</Text>
            </TouchableOpacity>
        </View>



    );

    const headerRight = () => (
        <TouchableWithoutFeedback onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
            <Image
                source={assets.right_arrow}
                style={{ width: 24, height: 24, tintColor: 'white' }}
            />
        </TouchableWithoutFeedback >


    )

    const headerCenter = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Achievements') }}>
            <Image source={assets.badge} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />
        </TouchableOpacity>
    )

    const headerLeft = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
            <Image source={assets.settings} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />
        </TouchableOpacity>
    )

    const getBirthday = () => {
        if (userData?.birthday)
            return moment(userData?.birthday?.toDate()).format("MMM DD, YYYY")
        return null
    }
    const onLibraryPress = async () => {
        setShowImageOptionsModal(false);
        const result = await openMediaLibrary('photo', 1);
        if (result) {
            updateUserProfile(auth.currentUser.displayName, result)
            updateCollection('users', auth.currentUser.uid, { photoURL: result });
        }
    }

    const onTakePicturePress = () => {
        navigation.navigate('Camera', { canRecord: false })
    }


    return (

        <View style={{ backgroundColor: Colors[colorScheme].background, flex: 1 }}>

            <ModalComponent renderContent={modal} showModal={showModal} toValue={-900} animated height={280} width={250} />

            <EditNameModal
                name={userData?.displayName}
                onCancelPress={() => {
                    setShowEditNameModal(false)
                }}
                showModal={showEditNameModal}
                onSavePress={(value) => {
                    setShowEditNameModal(false);
                    updateUserProfile((value), userData?.photoURL);//updates firbase user
                    updateCollection('users', auth.currentUser.uid, { displayName: value });//updates user collection
                }}
            />


            <OptionsModal
                options={['Take Picture', 'Choose From Library']}
                onOptionPress={[onTakePicturePress, onLibraryPress]}
                showModal={showImageOptionsModal}
                onCancelPress={() => { setShowImageOptionsModal(false) }}
            />

            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Settings'}
                headerCenter={headerCenter()}
                style={{ backgroundColor: Colors.primary, height: 150 }}
                headerRight={headerRight()}
                headerLeft={headerLeft()}
            />
            <View style={{ backgroundColor: Colors.primary, zIndex: 0, alignItems: 'center', height: 200 }}>





                <ProfileButton

                    onPress={() => setShowImageOptionsModal(true)}
                    size={120}
                    defaultImage={assets.person}
                    badgeContainerStyle={{ backgroundColor: Colors.primary, top: '75%', left: '70%' }}
                    badge={NewImageBadge()}

                />





                <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row' }}>
                    {userData?.displayName ?
                        <Text
                            onPress={() => setShowEditNameModal(true)}
                            style={{ fontSize: 24, fontFamily: 'KanitBold', color: 'white' }}>

                            {userData.displayName}
                        </Text>
                        :
                        <Text
                            onPress={() => setShowEditNameModal(true)}
                            style={{ color: '#00000080', fontFamily: 'Kanit', fontSize: 16 }}>

                            {'Display Name'}

                        </Text>

                    }
                    <TouchableWithoutFeedback
                        onPress={() => setShowEditNameModal(true)} >

                        <Image

                            source={assets.pencil} style={{ width: 15, height: 15, tintColor: '#00000080', marginLeft: 10 }}
                        />
                    </TouchableWithoutFeedback>

                </View>







            </View>
            <View style={{ paddingHorizontal: 20, backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 25, marginTop: -20, zIndex: 1 }}>

                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20, flexDirection: 'row', marginTop: 20 }}>


                        <View style={{ marginLeft: 10 }}>
                            {userData?.gradYear && <ProfileTag icon={<Text>🎓</Text>} title={userData?.gradYear} onPress={() => { setModal(classModal()); setShowModal(true); }} />}

                        </View>
                        <View style={{ marginLeft: 10 }}>
                            {userData?.birthday && <ProfileTag icon={<Text>🎂</Text>} title={getBirthday()} onPress={() => { setModal(birthdayModal()); setShowModal(true); }} />}

                        </View>

                        <View style={{ marginLeft: 10 }}>
                            {userData?.birthday && <ProfileTag icon={<Text>{getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth(), true)}</Text>} title={getZodiacSign(userData?.birthday.toDate().getDate(), userData?.birthday.toDate().getMonth())} onPress={() => { setModal(zodiacSignModal()); setShowModal(true); }} />}

                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>



    )
}


const styles = StyleSheet.create({


    emojiContainer: {
        backgroundColor: '#00000010',
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#00000030',

    },

    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    sectionTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 18,
        marginTop: 30

    },

    className: {
        fontSize: 20,
        fontFamily: 'KanitBold'


    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },

    number: {
        fontSize: 11,
        color: 'gray',
        marginLeft: 5
    }
})
export default CurrentUserProfile