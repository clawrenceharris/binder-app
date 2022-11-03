import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { auth, updateName, updateUserProfile } from '../../Firebase/firebase'
import Header from '../../components/Header'

const NameSettings = ({ route }) => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState(route.params.firstName ? route.params.firstName : '')
    const [lastName, setLastName] = useState(route.params.lastName ? route.params.lastName : '')
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Name'}
                shadow

            />
            <View style={{ padding: 10 }}>

                <Text style={styles.description}>{descriptions.name}</Text>
                <View style={{ marginTop: 30 }}>

                    <TextInput
                        placeholder='First Name'
                        style={{ color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomColor: '#6F6F6F', borderBottomWidth: 1 }}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholderTextColor={'#6F6F6F'}
                        selectionColor={Colors.light.primary}

                    />

                    <TextInput
                        placeholder='Last Name'
                        placeholderTextColor={'#6F6F6F'}
                        style={{ color: 'white', padding: 15, fontSize: 18, width: '100%', backgroundColor: '#474747', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}
                        onChangeText={setLastName}
                        value={lastName}
                        selectionColor={Colors.light.primary}

                    />



                </View>



                <TouchableOpacity
                    onPress={() => {

                        updateUserProfile(firstName + " " + lastName, auth.currentUser.photoURL);
                        updateName(firstName, lastName);
                        navigation.navigate('Settings');

                    }}
                    style={{ marginTop: 30, borderRadius: 50, width: '100%', backgroundColor: Colors.light.accent, padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'white', fontFamily: "Kanit", fontSize: 20 }}>Save</Text>
                </TouchableOpacity>

            </View>
        </View>

    )
}

export default NameSettings