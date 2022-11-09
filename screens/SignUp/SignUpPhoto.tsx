import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, LogBox, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '.'
import { assets, Colors } from '../../constants'
import { askForCameraPermission, openMediaLibrary, pickImage } from '../../utils'
import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'
import { AddUserToSchool, auth, db, updateCollection, updateUserProfile } from '../../Firebase/firebase'
import Camera from 'expo-camera'
import BottomSheet from '@gorhom/bottom-sheet'
import ModalComponent from '../../components/Modal'
import ImageOptionsModal from '../../components/ImageOptionsModal'
import Button from '../../components/Button'
import firebase from 'firebase/compat'

//TODO: need to implement uploading picture using camera
const SignUpPhoto = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [galleryItems, setGalleryItems] = useState([])
    const route = useRoute();
    const [users, setUsers] = useState([])
    const [user, setUser] = useState(null)

    const [showModal, setShowModal] = useState(false)
    const { firstName, lastName, birthday, school, uid } = route.params

    const onFinishedPressed = () => {

        db.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                uid: auth.currentUser.uid,
                firstName: firstName,
                lastName: lastName,
                photoURL: image,
                birthday: birthday,
                gpa: null,
                gradYear: null,
                school: school ? school : null,
                lastActive: new Date(),
                studyBuddies: [],
                friends: [],
                classes: []

            })



        let displayName = ""
        if (!firstName)
            displayName = lastName

        else if (!lastName)
            displayName = firstName
        else
            displayName = firstName + " " + lastName


        updateUserProfile(displayName, image)

        //add user doc reference to school collection
        AddUserToSchool(school.id, auth.currentUser.uid)
        navigation.navigate('Root')
    }

    const onSkipPressed = () => {
        setImage(null)

        db.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                uid: auth.currentUser.uid,
                firstName: firstName,
                lastName: lastName,
                photoURL: image,
                birthday: birthday,
                gpa: null,
                gradYear: null,
                school: school ? school : null,
                lastActive: new Date(),
                studyBuddies: [],
                friends: [],
                classes: []



            })



        let displayName = ""
        if (!firstName)
            displayName = lastName

        else if (!lastName)
            displayName = firstName
        else
            displayName = firstName + " " + lastName


        updateUserProfile(displayName, image)
        AddUserToSchool(school.id, auth.currentUser.uid)
        navigation.navigate('Root')


    }


    function onProfilePicturePress() {
        setShowModal(true)
    }
    const onBackPressed = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>

            {/* <ModalComponent setOpen={setShowModal} renderContent={modal()} width={300} height={modalHeight} toValue={-580} open={showModal} animated={true} showBottomCancelBar={true} cancelText="Cancel" /> */}

            <ImageOptionsModal

                onLibraryPress={async () => {
                    setShowModal(false);
                    const result = await openMediaLibrary('photo', 1);
                    if (result != null)
                        setImage(result);

                }}

                onTakePicturePress={() => { }}
                showModal={showModal}
                onCancelPress={() => { setShowModal(false) }}

            />
            <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 30 }}>

                <Text style={styles.screenTitle}>You're Almost Done!</Text>
                <Text style={[styles.screenTitle, { fontSize: 16, fontFamily: 'Kanit', textAlign: 'center', color: 'gray' }]}> Show others what you look like by uploading a profile photo.</Text>

                <TouchableOpacity
                    onPress={onProfilePicturePress}
                    style={{ alignSelf: 'center', alignItems: 'center', padding: 20, marginTop: 40, borderWidth: 3, width: 150 + 20, height: 150 + 20, borderRadius: 150, justifyContent: 'center', borderColor: Colors.light.primary }}>
                    <View style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>

                        {!image ? <Image source={assets.person} style={{ width: 140, height: 140, tintColor: 'gray' }} />
                            :
                            <View style={{ width: 150, height: 150, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={{ uri: image }} style={{ width: 160, height: 160, resizeMode: 'cover' }} />
                            </View>
                        }

                        <View style={{ borderRadius: 100, padding: 8, backgroundColor: '#333', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -20, right: -10 }}>
                            <Image source={assets.add_image} style={{ width: 40, height: 40, tintColor: Colors.light.primary }} />

                        </View>

                    </View>


                </TouchableOpacity>



                <Button
                    title={'Finish'}
                    background={styles.continueBtn.backgroundColor}
                    tint={'white'}
                    onPress={onFinishedPressed}
                    condition={image != null}
                    width={styles.continueBtn.width}
                    margin={30}

                />


                <TouchableWithoutFeedback onPress={onSkipPressed}>
                    <Text style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, alignSelf: 'center' }}>Skip</Text>
                </TouchableWithoutFeedback>

            </View>
        </SafeAreaView>

    )
}

export default SignUpPhoto