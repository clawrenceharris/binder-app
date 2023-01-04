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
import Input from '../../components/Input'

const NameSettings = ({ route }) => {
    const navigation = useNavigation()
    const [displayName, setDisplayName] = useState(route.params.displayName ? route.params.displayName : '')

    const onSavePress = () => {
        updateUserProfile(displayName, auth.currentUser.photoURL);
        updateCollection('users', auth.currentUser.uid, { displayName: displayName });
        navigation.goBack();
    }

    return (
        <View style={{ flex: 1, backgroundColor: Colors.primary }}>
            <Header
                navigation={navigation}
                direction={'horizontal'}
                title={'Name'}
                style={{ backgroundColor: Colors.primary }}

            />
            <View style={styles.mainContainer}>

                <Text style={styles.description}>{descriptions.name}</Text>


                <View style={{ width: '100%', marginTop: 30 }}>
                    <Input
                        placeholder='Name'
                        style={{ color: 'white' }}
                        value={displayName}
                        onChangeText={setDisplayName}

                    />
                </View>





                <Button
                    title={'Save'}
                    style={{ margin: 30 }}
                    disabled={displayName === route.params.displayName || !displayName}
                    onPress={onSavePress}
                />



            </View>
        </View>

    )
}

export default NameSettings