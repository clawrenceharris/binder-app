import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native'
import { assets, Colors } from '../../constants'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import CustomInput from '../../components/CustomInput'
import { auth, db, signIn, signUp } from '../../Firebase/firebase'
import useColorScheme from '../../hooks/useColorScheme'
import ModalComponent from '../../components/Modal'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { styles } from '.'

const SignUpEmailPassword = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const password = watch('password')
    const email = watch('email')
    const colorScheme = useColorScheme()
    const [error, setError] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const [uid, setUid] = useState('')

    const rewordError = (error) => {
        if (error.message == 'Firebase: The email address is already in use by another account. (auth/email-already-in-use).') {
            return 'Email address is already in use'
        }
        else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
            return 'Invalid email address'
        }
        else if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
            return 'Password should be at least 6 characters'
        }
    }


    const onSignUpPressed = (data) => {
        //validate user
        auth
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(userCredentials => {
                const user = userCredentials.user;

                console.log("UID: ", user.uid)
                setUid(user.uid)

                user.updateProfile({
                    displayName: '',
                    photoURL: '',

                })


                db.collection("users").doc(user.uid)
                    .set({
                        firstName: null,
                        lastName: null,
                        photoUrl: null,
                        birthday: null,
                        gpa: null,
                        gradYear: null,
                        school: null,
                        secondSchool: null,
                        lastActive: null


                    })

                navigation.navigate('SignUpName', { uid: uid })


            })
            .catch(error => {
                setError(rewordError(error))



            }).catch(error => setError(error.message))



    }





    return (


        <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
            <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
                <Image source={assets.left_arrow} style={{ width: 25, height: 25, tintColor: Colors.light.primary, margin: 20 }} />

            </TouchableWithoutFeedback>

            <View style={{ padding: 20, alignItems: 'center' }}>

                <Text style={styles.screenTitle}>Sign up with email and password</Text>
                {error && <Text style={styles.errorMessage}>{error}</Text>}
                <View style={{ alignItems: 'center', width: '100%', padding: 20, marginTop: 10 }}>
                    <View style={{ width: '100%' }}>
                        <Text style={styles.textInputTitle}>EMAIL</Text>
                        <CustomInput
                            control={control}
                            name="email"
                            placeholder=""
                            secureTextEntry={false}
                            rules={{ required: 'Username is required' }}
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <Text style={styles.textInputTitle}>PASSWORD</Text>
                        <CustomInput
                            control={control}
                            name="password"
                            placeholder=""
                            secureTextEntry
                            rules={{ required: 'Username is required' }}
                            keyboardType=''


                        />
                    </View>

                    <Text style={[styles.finePrint, { textAlign: 'left' }]}>{'By tapping Accept & Continue, you ackknowledge that you have read the Privacy Policy and agree to our Terms of Service'}</Text>

                </View>



                <TouchableOpacity
                    activeOpacity={email && password ? 0.3 : 1}
                    style={[styles.continueBtn, { backgroundColor: email && password ? Colors.light.primary : 'lightgray' }]}
                    onPress={email && password ? handleSubmit(onSignUpPressed) : () => { }}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{'Accept & Continue'}</Text>
                </TouchableOpacity>




                <View style={{ flexDirection: 'row', margin: 20, alignSelf: 'center' }}>
                    <Text style={{ color: 'white' }}>Already have an account?</Text>
                    <Text
                        style={{ color: Colors.light.primary, fontWeight: 'bold', marginLeft: 5 }}
                        onPress={() => { navigation.navigate('SignIn') }}
                    >Log In</Text>

                </View>

            </View>
        </SafeAreaView>

    )
}


export default SignUpEmailPassword