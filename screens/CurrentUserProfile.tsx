import { View, Text, StyleSheet, ImageBackground, Image, Modal, FlatList, Button, AsyncStorage, TouchableOpacity, TouchableWithoutFeedback, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import QuickActions from '../components/QuickActions'
import ClassProfileCircle from '../components/ClassProfileCircle'
import { UserProfileCircle } from '../components'
import CircleButton from '../components/CircleButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SHADOWS, SIZES } from '../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import ProfileTag from '../components/ProfileTag'
import ModalComponent from '../components/Modal'
import moment from 'moment'
import { ColorSpace } from 'react-native-reanimated'
import ClassListItem from '../components/ClassListItem'
import Classes from '../constants/data/Classes'
import ProfileListBox from '../components/ProfileListBox'
import ClassChatListItem from '../components/ClassChatListItem'
import ChatRooms from '../constants/data/ChatRooms'
import { auth, updateUserProfile } from '../Firebase/firebase'
import { openMediaLibrary } from '../utils'
import EditNameModal from '../components/EditNameModal'
import ImageOptionsModal from '../components/ImageOptionsModal'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
//route.params = class, user
const CurrentUserProfile = ({ route }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()
    const [showModal, setShowModal] = useState(false)
    const [modal, setModal] = useState(null)
    const [image, setImage] = useState(null)
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)
    const [showEditNameModal, setShowEditNameModal] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const user = route.params.user


    const studyBuddyModal = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 12 }}>
            <View style={{ backgroundColor: colorScheme === 'light' ? '#F8F8F8' : '#1A1A1A', borderRadius: 50, width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colorScheme === 'light' ? '#F1F2F4' : '#121212' }}>
                <Text style={{ fontSize: 36 }}>🤓</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: colorScheme === 'light' ? '#2D3035' : '#DEDEDE' }}>Study Buddies</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: colorScheme === 'light' ? '#666D77' : '#999999' }}>You and {user.displayName} are both Study Buddies!</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: colorScheme === 'light' ? '#EDEEF0' : '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>
    );


    const birthdayModal = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <View style={{ backgroundColor: colorScheme === 'light' ? '#F8F8F8' : '#1A1A1A', borderRadius: 50, width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colorScheme === 'light' ? '#F1F2F4' : '#121212' }}>
                <Text style={{ fontSize: 36 }}>🎂</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: colorScheme === 'light' ? '#2D3035' : '#DEDEDE' }}>Birthday</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: colorScheme === 'light' ? '#666D77' : '#999999' }}>{'user.uid' != auth?.currentUser?.uid ? `${user.displayName}'s` : 'Your'} birthday is on {moment(route.params.user.birthday).format("MMM DD, YYYY")}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: colorScheme === 'light' ? '#EDEEF0' : '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>
    );



    const zodiacSignModal = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <View style={{ backgroundColor: colorScheme === 'light' ? '#F8F8F8' : '#1A1A1A', borderRadius: 50, width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colorScheme === 'light' ? '#F1F2F4' : '#121212' }}>
                <Text style={{ fontSize: 36 }}>♏️</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: colorScheme === 'light' ? '#2D3035' : '#DEDEDE' }}>Zodiac</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: colorScheme === 'light' ? '#666D77' : '#999999' }}>{user.displayName} is a Scorpio</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: colorScheme === 'light' ? '#EDEEF0' : '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>


    );
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    function editNameModal() {


        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18, fontFamily: 'Kanit' }}>Edit Name</Text>
                <Text style={{ color: 'gray', fontFamily: "Kanit", textAlign: 'center' }}>This is how you appear on Binder, so pick a name your classmates know you by</Text>


                <View style={{ margin: 20, width: '100%' }}>

                    <TextInput
                        placeholder='First Name'
                        style={{ color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#6F6F6F', borderBottomWidth: 1 }}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholderTextColor={'#6F6F6F'}

                    />

                    <TextInput
                        placeholder='Last Name'
                        placeholderTextColor={'#6F6F6F'}
                        style={{ color: 'white', padding: 15, fontSize: 18, paddingHorizontal: 10, width: '100%', backgroundColor: '#474747', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                        onChangeText={setLastName}
                        value={lastName}

                    />
                </View>



                <TouchableOpacity
                    onPress={() => { updateUserProfile(firstName + " " + lastName, user.photoURL); setShowModal(false); }}
                    style={{ borderRadius: 50, width: '100%', backgroundColor: Colors.light.accent, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: "Kanit", fontSize: 20 }}>Save</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setShowModal(false) }}>
                    <Text style={{ color: 'white', fontFamily: "Kanit", marginTop: 20 }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const classModal = () => (
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <View style={{ backgroundColor: colorScheme === 'light' ? '#F8F8F8' : '#1A1A1A', borderRadius: 50, width: 80, height: 80, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colorScheme === 'light' ? '#F1F2F4' : '#121212' }}>
                <Text style={{ fontSize: 36 }}>🎓</Text>
            </View>

            <View>
                <Text style={{ fontFamily: 'KanitBold', fontSize: 18, marginTop: 20, color: colorScheme === 'light' ? '#2D3035' : '#DEDEDE' }}>Class</Text>

            </View>
            <View>
                <Text style={{ fontFamily: 'Kanit', textAlign: 'center', marginTop: 10, color: colorScheme === 'light' ? '#666D77' : '#999999' }}>{user.displayName} graduates in {route.params.user.class}</Text>

            </View>

            <TouchableOpacity
                onPress={() => { setShowModal(false) }}
                style={{ height: 50, backgroundColor: colorScheme === 'light' ? '#EDEEF0' : '#2B2B2B', borderRadius: 25, justifyContent: 'center', alignItems: 'center', width: 200, marginTop: 20 }}>
                <Text style={{ color: Colors.light.primary, fontFamily: 'KanitMedium', fontSize: 20 }}>Close</Text>
            </TouchableOpacity>


        </View>

    );

    const headerRight = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
            <Image source={assets.settings} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />
        </TouchableOpacity>
    )

    const headerCenter = () => (
        <TouchableOpacity onPress={() => { navigation.navigate('Achievements') }}>
            <Image source={assets.badge} style={{ width: 25, height: 25, tintColor: Colors.dark.tint }} />

        </TouchableOpacity>
    )



    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Settings'}
                headerCenter={headerCenter()}
                shadow
                headerRight={headerRight()}
            />

            <View style={{ paddingHorizontal: 20 }}>

                {/* <ModalComponent renderContent={modal} showModal={false} toValue={-1200} height={290} /> */}

                <EditNameModal
                    setFirstName={setFirstName}
                    setLastName={setLastName}
                    onCancelPress={() => {
                        setShowEditNameModal(false)
                    }}
                    showModal={showEditNameModal}
                    onSavePress={() => {


                        setShowEditNameModal(false)
                    }}
                />


                <ImageOptionsModal
                    onLibraryPress={async () => {
                        setShowImageOptionsModal(false);
                        const result = await openMediaLibrary('photo', 1);
                        if (result != null)
                            updateUserProfile(auth.currentUser.displayName, result)

                    }}

                    onTakePicturePress={() => { }}
                    showModal={showImageOptionsModal}
                    onCancelPress={() => { setShowImageOptionsModal(false) }}
                />



                <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%' }}>


                    <View style={{ alignItems: 'center' }}>


                        <TouchableWithoutFeedback onPress={() => { setShowImageOptionsModal(true) }}>
                            <View>

                                <View style={{ borderRadius: 100, padding: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -1, right: -5, zIndex: 1 }}>
                                    <Image source={assets.add_image} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />

                                </View>

                                <UserProfileCircle user={user} showStudyBuddy={false} showStoryBoder size={120} showName bold showActive={false} />

                            </View>

                        </TouchableWithoutFeedback>

                    </View>




                    <View style={{ alignItems: 'center', marginTop: 10, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text
                            onPress={() => { setShowEditNameModal(true) }}
                            style={{ fontSize: 24, fontFamily: 'KanitBold', color: 'white' }}>{user.displayName}</Text>
                        <TouchableWithoutFeedback
                            onPress={() => { setShowEditNameModal(true) }} >

                            <Image

                                source={assets.pencil} style={{ width: 15, height: 15, tintColor: '#6F6F6F', marginLeft: 10 }}
                            />
                        </TouchableWithoutFeedback>

                    </View>





                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 20, flexDirection: 'row', marginTop: 20 }}>

                        {user && user.studyBuddy && <ProfileTag icon={<Text>🤓</Text>} title={'Study Buddies'} width={135} onPress={() => { setShowModal(true); setModal(studyBuddyModal()); }} />}


                        <View style={{ marginLeft: 10 }}>
                            {user && <ProfileTag icon={<Text>🎓</Text>} title={route.params.user.class} width={90} onPress={() => { setShowModal(true); setModal(classModal()); }} />}

                        </View>
                        <View style={{ marginLeft: 10 }}>
                            {user && <ProfileTag icon={<Text>🎂</Text>} title={moment(route.params.user.birthday).format("MMM DD, YYYY")} width={135} onPress={() => { setShowModal(true); setModal(birthdayModal()); }} />}

                        </View>

                        <View style={{ marginLeft: 10 }}>
                            {user && <ProfileTag icon={<Text>♏️</Text>} title={'Scorpio'} width={100} onPress={() => { setShowModal(true); setModal(zodiacSignModal()); }} />}

                        </View>



                    </ScrollView>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        <Text style={[styles.sectionTitle, { color: '#DEDEDE' }]}>Props</Text>


                    </View>
                    <View style={{ alignItems: "center", flexDirection: 'row', padding: 20, width: '100%', backgroundColor: '#5B5B5B', ...SHADOWS[colorScheme], borderRadius: 15, marginTop: 10, shadowColor: '#272727' }}>

                        <Image source={assets.shines} style={{ width: 28, height: 28, tintColor: 'white' }} />
                        <Text style={{ color: 'white', fontFamily: 'Kanit', marginLeft: 10, fontSize: 16 }}>View Your Props</Text>


                        <Image source={assets.right_arrow} style={{ width: 20, height: 20, tintColor: 'gray', right: 10, position: 'absolute' }} />

                    </View>

                    <Text style={[styles.sectionTitle, { color: '#DEDEDE' }]}>Your Clips</Text>
                    <View style={{ flexDirection: 'row', padding: 20, alignItems: 'center', width: '100%', backgroundColor: '#5B5B5B', ...SHADOWS[colorScheme], borderRadius: 15, marginTop: 10, shadowColor: '#272727' }}>
                        <Image source={assets.camera_o} style={{ width: 28, height: 28, tintColor: Colors.light.primary }} />
                        <Text style={{ color: 'white', fontFamily: 'Kanit', marginLeft: 10, fontSize: 16 }}>Add to Your Clips</Text>
                    </View>





                </ScrollView>

            </View>







        </View >



    )
}


const styles = StyleSheet.create({

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