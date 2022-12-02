import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '.'
import { assets, Colors } from '../../constants'
import { openMediaLibrary } from '../../utils'
import { useRoute } from '@react-navigation/native'
import { AddUserToSchool, auth, db, updateCollection, updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'
import OptionsModal from '../../components/OptionsModal'

//TODO: need to implement uploading picture using camera
const SignUpPhoto = ({ navigation }) => {
    const [image, setImage] = useState(null)
    const route = useRoute();

    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)
    const { displayName, birthday, school, uid } = route.params

    const onFinishedPressed = () => {

        db.collection('users')
            .doc(auth.currentUser.uid)
            .set({
                uid: auth.currentUser.uid,
                displayName: displayName,
                photoURL: image,
                birthday: birthday,
                gpa: '',
                gradYear: '',
                school: school ? school : null,
                lastActive: new Date(),
                studyBuddies: [],
                friends: [],
                classes: []

            })






        updateUserProfile(name, image)

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
                displayName: displayName,
                photoURL: image,
                birthday: birthday,
                gpa: '',
                gradYear: '',
                school: school ? school : null,
                lastActive: new Date(),
                studyBuddies: [],
                friends: [],
                classes: []



            })






        updateUserProfile(displayName, image)
        AddUserToSchool(school.id, auth.currentUser.uid)
        navigation.navigate('Root')


    }


    function onProfilePicturePress() {
        setShowImageOptionsModal(true)
    }
    const onBackPressed = () => {
        navigation.goBack()
    }

    const onLibraryPress = async () => {
        setShowImageOptionsModal(false);
        const result = await openMediaLibrary('photo', 1);
        if (result) {
            setImage(result)
            updateUserProfile(auth.currentUser.displayName, result)
            updateCollection('users', auth.currentUser.uid, { photoURL: result });
        }
    }

    const onTakePicturePress = () => {
        navigation.navigate('Camera', { canRecord: false })
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.accent }}>

            {/* <ModalComponent setOpen={setShowModal} renderContent={modal()} width={300} height={modalHeight} toValue={-580} open={showModal} animated={true} showBottomCancelBar={true} cancelText="Cancel" /> */}

            <OptionsModal
                options={['Take Picture', 'Choose From Library']}
                onOptionPress={[onTakePicturePress, onLibraryPress]}
                showModal={showImageOptionsModal}
                onCancelPress={() => { setShowImageOptionsModal(false) }}
            />
            <TouchableWithoutFeedback onPress={onBackPressed}>
                <Image source={assets.left_arrow} style={{ width: 28, height: 28, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 20 }}>

                <Text style={styles.screenTitle}>{"You're Almost Done!"}</Text>
                <Text style={styles.description}>{"Show others what you look like by uploading a profile photo!"}</Text>

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

                        <View style={{ borderRadius: 100, padding: 8, backgroundColor: Colors.light.accent, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -20, right: -10 }}>
                            <Image source={assets.add_image} style={{ width: 40, height: 40, tintColor: Colors.light.primary }} />

                        </View>

                    </View>


                </TouchableOpacity>



                <Button
                    title={!image ? 'Finish' : 'Finish 😎'}
                    onPress={onFinishedPressed}
                    style={{ borderRadius: 15, margin: 40 }}
                    disabled={!image}
                />


                <TouchableWithoutFeedback onPress={onSkipPressed}>
                    <Text style={{ fontFamily: 'KanitSemiBold', color: 'white', alignSelf: 'center', fontSize: 16 }}>{"Skip"}</Text>
                </TouchableWithoutFeedback>

            </View>
        </SafeAreaView>

    )
}

export default SignUpPhoto