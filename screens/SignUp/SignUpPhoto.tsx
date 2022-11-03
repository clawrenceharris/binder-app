import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, LogBox, RefreshControl } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '.'
import { assets, Colors } from '../../constants'
import { askForCameraPermission, openMediaLibrary, pickImage } from '../../utils'
import * as ImagePicker from 'expo-image-picker'
import { useRoute } from '@react-navigation/native'
import { auth, db, updateUserProfile } from '../../Firebase/firebase'
import Camera from 'expo-camera'
import BottomSheet from '@gorhom/bottom-sheet'
import ModalComponent from '../../components/Modal'
import ImageOptionsModal from '../../components/ImageOptionsModal'


//TODO: need to implement uploading picture using camera
const SignUpPhoto = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const [hasCameraPermission, setHasCameraPermission] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission] = useState(false)
    const [galleryItems, setGalleryItems] = useState([])
    const route = useRoute();
    const [showModal, setShowModal] = useState(false)
    const { firstName, lastName, birthday, gpa, gradYear, school, secondSchool, uid } = route.params
    console.log("AUTH UID ", auth.currentUser.uid)
    const onFinishedPressed = () => {

        db.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                photoUrl: image,
                birthday: birthday,
                gpa: gpa,
                gradYear: gradYear,
                school: school,
                secondSchool: secondSchool,
                lastActive: new Date()
            })



        let displayName = ""
        if (!firstName)
            displayName = lastName

        else if (!lastName)
            displayName = firstName
        else
            displayName = firstName + " " + lastName


        updateUserProfile(displayName, image)
        navigation.replace('Root')
    }

    const onSkipPressed = () => {
        setImage('')
        console.log("UID: ", uid)

        db.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                firstName: firstName,
                lastName: lastName,
                photoUrl: image,
                birthday: birthday,
                gpa: gpa,
                gradYear: gradYear,
                school: school,
                secondSchool: secondSchool,
                lastActive: new Date()



            })



        let displayName = ""
        if (!firstName)
            displayName = lastName

        else if (!lastName)
            displayName = firstName
        else
            displayName = firstName + " " + lastName


        updateUserProfile(displayName, image)
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

                <TouchableOpacity
                    activeOpacity={image ? 0.3 : 1}
                    style={[styles.continueBtn, { backgroundColor: image ? Colors.light.primary : 'lightgray', marginTop: 60 }]}
                    onPress={image ? onFinishedPressed : () => { }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Finish</Text>
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={onSkipPressed}>
                    <Text style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, alignSelf: 'center', marginTop: 30 }}>Skip</Text>
                </TouchableWithoutFeedback>

            </View>
        </SafeAreaView>

    )
}

export default SignUpPhoto