import { View, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import ToggleButton from '../../components/ToggleButton'
import { auth, updateUserProfile } from '../../Firebase/firebase'
import ModalComponent from '../../components/Modal'
import CustomInput from '../../components/CustomInput'
import Button from '../../components/Button'
import firebase from 'firebase/compat'
import { sendEmailVerification } from 'firebase/auth'
const EmailSettings = ({ route }) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState(route.params.value)
    const [currentState, setCurrentState] = useState(false)
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [verificationPending, setVerificationPending] = useState(!auth.currentUser.emailVerified)
    const [showModal, setShowModal] = useState(false)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const getMessage = (message) => {
        if (message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
            return 'This email address already exists'
        }
        else if (message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
            return 'Invalid email address'
        }
        else if (message == 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).')
            return 'Invalid password'


        return 'Error'

    }
    function reauthenticate(currentPassword) {
        var user = auth.currentUser;
        var cred = firebase.auth.EmailAuthProvider.credential(
            user.email, currentPassword);

        return user.reauthenticateWithCredential(cred);
    }

    function changePassword(currentPassword, newPassword) {
        reauthenticate(currentPassword).then(() => {
            var user = auth.currentUser;
            user.updatePassword(newPassword).then(() => {
                console.log("Password updated!");
                sendEmailVerification(auth.currentUser)
            }).catch((error) => { console.log(error); });
        }).catch((error) => { console.log(error); });
    }



    function changeEmail() {
        reauthenticate(password).then(() => {
            var user = auth.currentUser;
            user.updateEmail(email).then(() => {
                setErrorMessage('')
                setSuccessMessage("");
                setSuccessMessage("Email successfully updated!");
            }).catch((error) => {
                setErrorMessage(getMessage(error.message))
            });
        }).catch((error) => {
            console.log(error.message)
            setErrorMessage(getMessage(error.message))

        });
        return null

    }
    const handleChangeEmail = () => {
        console.log(changeEmail())
    }
    const handleSave = () => {
        setErrorMessage('')
        setSuccessMessage("");

        setShowModal(true)
    }


    return (


        <View style={{ flex: 1, backgroundColor: '#333', padding: 20 }}>

            <ModalComponent
                width={300}
                height={300}
                showModal={showModal}
                animated
                toValue={-1000}
                renderContent={
                    <View style={{ alignItems: 'center' }}>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: 'white', marginBottom: 20, paddingBottom: 10 }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontFamily: "KanitMedium", fontSize: 18 }}>Password</Text>
                        </View>
                        <Text style={styles.description}>For security, enter your password first.</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput
                                placeholder='Password'
                                style={{ margin: 20, color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderRadius: 10 }}
                                autoFocus
                                value={password}
                                onChangeText={(value) => { setPassword(value); }}
                                placeholderTextColor={'#6F6F6F'}
                                secureTextEntry={!showPassword}

                            />
                            <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                                <Text style={{ position: 'absolute', right: 40, color: 'gray', fontFamily: "KanitMedium", fontSize: 16 }}>{showPassword ? "Hide" : "Show"}</Text>

                            </TouchableWithoutFeedback>
                        </View>

                        <Button condition={password != ''} background={Colors.light.primary} tint={'white'} title={'Contine'} onPress={() => { setPassword(''); setShowModal(false); handleChangeEmail(); }} />

                        <Text style={{ marginTop: 20, color: 'white', alignSelf: 'center' }} onPress={() => { setPassword(''); setShowModal(false) }}>Cancel</Text>
                    </View>
                }
            />


            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: SIZES.header, padding: 5, backgroundColor: '#333' }}>
                <View style={{ position: 'absolute', left: 0, paddingTop: 30 }}>
                    <BackButton navigation={navigation} margin={5} color={'white'} direction={'horizontal'} />

                </View>
                <View style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', paddingTop: 30 }}>

                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}>Email</Text>

                </View>


            </View>
            {!verificationPending ? <Text style={styles.description}>{descriptions.email}</Text> :

                <Text style={styles.description}>{"⚠️ We've sent a verification email to you. Please open the link to finish verifying your address."}</Text>}

            <View style={{ marginTop: 30 }}>
                {verificationPending && <Text
                    onPress={() => { }}
                    style={{ color: Colors.light.primary }}>Resend Verification Email</Text>}

            </View>

            <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>


                <TextInput
                    returnKeyType='done'
                    placeholder='Email'
                    placeholderTextColor={'#6F6F6F'}
                    style={{ color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderRadius: 10 }}
                    onChangeText={(value) => { setEmail(value); setErrorMessage(''); setSuccessMessage('') }}
                    value={email}
                    selectionColor={Colors.light.primary}

                >
                </TextInput>

                <TouchableOpacity
                    activeOpacity={1}
                    onPress={email !== route.params.value ? handleSave : () => { }}>
                    <Text style={{ position: 'absolute', bottom: -12, right: 10, color: email !== route.params.value ? Colors.light.primary : 'gray', fontFamily: "KanitMedium", fontSize: 16 }}>Save</Text>

                </TouchableOpacity>


            </View>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <Text style={styles.successMessage}>{successMessage}</Text>

            <View style={{ marginTop: 20, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderColor: '#646464', backgroundColor: '#272727' }}>
                <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 17, width: '50%' }}>Show this email on my profile</Text>
                <ToggleButton onToggle={() => { setCurrentState(!currentState) }} currentState={currentState} />

            </View>

            <View style={{ marginTop: 20, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderColor: '#646464', backgroundColor: '#272727' }}>
                <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 17, width: '50%' }}>Let others find me using this email</Text>
                <ToggleButton onToggle={() => { setCurrentState(!currentState) }} currentState={currentState} />

            </View>
        </View>
    )
}

export default EmailSettings