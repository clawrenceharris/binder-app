import { View, Text, SafeAreaView, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image } from 'react-native'
import CustomInput from '../components/CustomInput'
import { auth } from '../Firebase/firebase'
import Button from '../components/Button'
import BackButton from '../components/BackButton'
import useColorScheme from '../hooks/useColorScheme'
const SignIn = ({ navigation }) => {
  const colorScheme = useColorScheme()
  const { control, handleSubmit, watch } = useForm();
  const password = watch('password')
  const email = watch('email')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const rewordError = (error) => {
    console.log(error.message)
    if (error.message == 'Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).') {
      return 'The email or password you entered is incorrect.'
    }

    else if (error.message == 'Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).')
      return 'The email or password you entered is incorrect.'
    else if (error.message == 'Firebase: The email address is badly formatted. (auth/invalid-email).') {
      return 'The email or password you entered is incorrect.'
    }
    else if (error.message == 'Firebase: A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred. (auth/network-request-failed).') {
      return 'Failed to connect to a network. Please make sure you are connected to the internet.'
    }
    else return 'Sorry, something went wrong. Please try agian later.'
  }

  const onSignInPressed = (data) => {
    setLoading(true)
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then(user => {
        setLoading(false)
        navigation.navigate('Root')


      })

      .catch(error => {
        setError(rewordError(error))
        setLoading(false)

      }

      )
  }


  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.accent }}>
      <View style={{ height: '25%' }}>
        <BackButton
          direction={'horizontal'}
          color={'white'}
          margin={20}
          navigation={navigation}

        />
        <Text style={styles.screenTitle}>{"Log in to your account"}</Text>
      </View>


      <View style={{ padding: 20, alignItems: 'center', backgroundColor: 'white', height: '100%', borderRadius: 15 }}>


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

            />
          </View>

        </View>




        <Button
          title={'Log In'}
          onPress={handleSubmit(onSignInPressed)}
          style={{ borderRadius: 15 }}
          disabled={!email || !password}


        />


        <View style={{ flexDirection: 'row', margin: 20, alignSelf: 'center' }}>
          <Text style={{ color: 'darkgray', fontFamily: 'Kanit' }}>{"Don't have an account?"}</Text>
          <Text
            style={{ color: Colors.light.primary, marginLeft: 5, fontFamily: 'KanitSemiBold' }}
            onPress={() => { navigation.navigate('SignUpEmailPassword') }}
          >{"Sign Up"}</Text>

        </View>

      </View>
    </SafeAreaView>
  )


}

const styles = StyleSheet.create({
  continueBtn: {
    borderRadius: 15,
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
    fontSize: 30,
    width: '60%',
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

