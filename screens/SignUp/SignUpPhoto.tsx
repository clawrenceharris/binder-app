import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '.'
import { assets, Colors } from '../../constants'
import { openMediaLibrary } from '../../utils'
import { useRoute } from '@react-navigation/native'
import { AddUserToSchool, auth, db, updateCollection, updateUserProfile } from '../../Firebase/firebase'
import Button from '../../components/Button'
import OptionsModal from '../../components/OptionsModal'
import Header from '../../components/Header'

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






        updateUserProfile(displayName, image)

        //add user doc reference to school collection
        AddUserToSchool(school.id)
        navigation.popToTop()
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
        AddUserToSchool(school.id)
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
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>

            <Header
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}
            />
            <OptionsModal
                options={['Take Picture', 'Choose From Library']}
                onOptionPress={[onTakePicturePress, onLibraryPress]}
                showModal={showImageOptionsModal}
                onCancelPress={() => { setShowImageOptionsModal(false) }}
            />


            <View style={{ padding: 20 }}>

                <Text style={styles.screenTitle}>{"You're Almost Done!"}</Text>
                <Text style={styles.description}>{"Show others what you look like by uploading a profile photo!"}</Text>

                <TouchableOpacity
                    onPress={onProfilePicturePress}
                    style={{ alignSelf: 'center', alignItems: 'center', padding: 20, marginTop: 40, borderWidth: 3, width: 150 + 20, height: 150 + 20, borderRadius: 150, justifyContent: 'center', borderColor: Colors.accent }}>
                    <View style={{ width: 150, height: 150, borderRadius: 100, backgroundColor: '#00000020', justifyContent: 'center', alignItems: 'center' }}>

                        {!image ? <Image source={assets.person} style={{ width: 140, height: 140, tintColor: '#00000050' }} />
                            :
                            <View style={{ width: 150, height: 150, borderRadius: 100, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>

                                <Image source={{ uri: image }} style={{ width: 160, height: 160, resizeMode: 'cover' }} />
                            </View>
                        }

                        <View style={{ borderRadius: 100, padding: 8, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -20, right: -10 }}>
                            <Image source={assets.add_image} style={{ width: 40, height: 40, tintColor: 'white' }} />

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
        </View>

    )
}

export default SignUpPhoto