import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native'
import { assets, Colors } from '../constants'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'
import { Image } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'
import CustomInput from '../components/CustomInput'
import { auth, signIn } from '../Firebase/firebase'
const SignIn = ({ navigation }) => {
  const { control, handleSubmit, watch } = useForm();
  const password = watch('password')
  const email = watch('email')
  const [error, setError] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const rewordError = (error) => {
    if (error.message == 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
      return 'Email or password is incorrect'
    }

    else if (error.message == 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).')
      return 'Email or password is incorrect'
    else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
      return 'Email or password is incorrect'
    }
  }

  const onSignInPressed = (data) => {
    //validate user

    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(userCredentials => {
        const user = userCredentials.user;
        navigation.navigate('Root')
      })

      .catch(error => {
        setError(rewordError(error))
      }

      )
  }


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#333' }}>
      <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
        <Image source={assets.left_arrow} style={{ width: 25, height: 25, tintColor: Colors.light.primary, margin: 20 }} />

      </TouchableWithoutFeedback>

      <View style={{ padding: 20, alignItems: 'center' }}>

        <Text style={styles.screenTitle}>Log in to your account</Text>

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

            />
          </View>

        </View>



        <TouchableOpacity
          activeOpacity={email && password ? 0.3 : 1}
          style={[styles.continueBtn, { backgroundColor: email && password ? Colors.light.primary : 'lightgray' }]}
          onPress={email && password ? handleSubmit(onSignInPressed) : () => { }}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Log In</Text>
        </TouchableOpacity>




        <View style={{ flexDirection: 'row', margin: 20, alignSelf: 'center' }}>
          <Text style={{ color: 'white' }}>Don't have an account?</Text>
          <Text
            style={{ color: Colors.light.primary, fontWeight: 'bold', marginLeft: 5 }}
            onPress={() => { navigation.navigate('SignUp') }}
          >Sign Up</Text>

        </View>

      </View>
    </SafeAreaView>
  )


}

const styles = StyleSheet.create({
  continueBtn: {
    borderRadius: 25,
    backgroundColor: Colors.light.primary,
    padding: 15,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    alignSelf: 'center'
  },
  input: {
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
    width: '100%',
    fontSize: 20,
    padding: 5,
    color: 'white'
  },

  textInputTitle: {
    color: 'lightgray',
    alignSelf: 'flex-start',
    fontSize: 12
  },

  finePrint: {
    fontFamily: 'Kanit',
    color: 'lightgray',
    fontSize: 11,
    textAlign: 'center',
  },

  errorMessage: {
    color: '#FD6464',
    fontFamily: 'Kanit'
  },

  screenTitle: {
    color: 'white',
    fontFamily: 'KanitMedium',
    fontSize: 24,
    alignSelf: 'center'
  },

  birthdayInputContainer: {
    alignItems: 'center',
    width: '100%',
    padding: 20,
    marginTop: 40,
    flexDirection: 'row'
  },

})
export default SignIn

