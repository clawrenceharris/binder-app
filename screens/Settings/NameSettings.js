import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import { auth, updateCollection, updateName, updateUserProfile } from '../../Firebase/firebase'
import Header from '../../components/Header'
import Button from '../../components/Button'

const NameSettings = ({ route }) => {
    const navigation = useNavigation()
    const [firstName, setFirstName] = useState(route.params.firstName ? route.params.firstName : '')
    const [lastName, setLastName] = useState(route.params.lastName ? route.params.lastName : '')

    const onSavePress = () => {
        updateUserProfile(firstName + " " + lastName, auth.currentUser.photoURL);
        updateCollection('users', auth.currentUser.uid, { firstName: firstName, lastName: lastName });
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Name'}
                shadow

            />
            <View style={styles.mainContainer}>

                <Text style={styles.description}>{descriptions.name}</Text>
                <View style={{ marginTop: 30 }}>

                    <TextInput
                        placeholder='First Name'
                        style={[styles.input, { borderBottomWidth: 1, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }]}
                        onChangeText={setFirstName}
                        value={firstName}
                        placeholderTextColor={'#6F6F6F'}
                        selectionColor={Colors.light.primary}

                    />

                    <TextInput
                        placeholder='Last Name'
                        placeholderTextColor={'#6F6F6F'}
                        style={[styles.input, { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}
                        onChangeText={setLastName}
                        value={lastName}
                        selectionColor={Colors.light.primary}

                    />
                </View>



                <Button
                    background={Colors.light.primary}
                    tint={'white'}
                    width={'100%'}
                    margin={30}
                    condition={firstName != route.params.firstName || lastName != route.params.lastName}
                    onPress={onSavePress}
                    title={'Save'}
                />



            </View>
        </View>

    )
}

export default NameSettings