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
import Button from '../../components/Button'
import BackButton from '../../components/BackButton'
import Header from '../../components/Header'
import Achievements from '../../constants/data/Achievements'

const SignUpEmailPassword = ({ navigation }) => {
    const { control, handleSubmit, watch } = useForm();
    const password = watch('password')
    const email = watch('email')
    const [error, setError] = useState('')
    const colorScheme = useColorScheme()
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


                user.updateProfile({
                    displayName: '',
                    photoURL: '',

                })


                db.collection("users").doc(user.uid)
                    .set({
                        uid: user.uid,
                        displayName: '',
                        photoURL: '',
                        birthday: null,
                        gpa: '',
                        gradYear: '',
                        school: null,
                        lastActive: new Date(),
                        studyBuddies: [],
                        friends: [],
                        classes: []



                    })
                Achievements.forEach((item) => {
                    db.collection('users')
                        .doc(user.uid)
                        .collection('achievements')
                        .doc(item.id)
                        .set({
                            achievement: db.collection('achievements').doc(item.id),
                            amountDone: 0,
                            index: 0
                        })

                })
                navigation.navigate('SignUpName', { uid: uid })


            })
            .catch(error => {
                setError(rewordError(error))



            }).catch(error => setError(error.message))



    }





    return (


        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                style={{ backgroundColor: Colors.primary }}
            />
            <Text style={styles.screenTitle}>{"Sign up with your email and password."}</Text>



            <View style={{ paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center', backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 15 }}>

                {error && <Text style={styles.errorMessage}>{error}</Text>}
                <View style={{ alignItems: 'center', width: '100%', margin: 20 }}>
                    <View style={{ width: '100%' }}>
                        <CustomInput
                            control={control}
                            name="email"
                            placeholder="Email"
                            secureTextEntry={false}
                            rules={{ required: 'Username is required' }}
                            keyboardType='email-address'
                        />
                    </View>

                    <View style={{ width: '100%', marginTop: 15 }}>
                        <CustomInput
                            control={control}
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            rules={{ required: 'Username is required' }}
                            keyboardType=''


                        />
                    </View>

                    <Text style={[styles.finePrint, { textAlign: 'left', marginTop: 5 }]}>{'By tapping Accept & Continue, you ackknowledge that you have read the Privacy Policy and agree to our Terms of Service.'}</Text>

                </View>



                <Button
                    onPress={handleSubmit(onSignUpPressed)}
                    title={'Accept & Continue'}
                    disabled={!email && !password}
                    style={{ borderRadius: 15 }}


                />



                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: 'darkgray', fontFamily: 'Kanit' }}>{"Already have an account?"}</Text>
                    <Text
                        style={{ color: Colors.accent, fontWeight: 'bold', marginLeft: 5, fontFamily: 'KanitBold' }}
                        onPress={() => { navigation.navigate('SignIn') }}>
                        {"Log In"}
                    </Text>

                </View>

            </View>
        </View>

    )
}



export default SignUpEmailPassword