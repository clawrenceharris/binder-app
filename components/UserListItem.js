import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton'
import { db } from '../Firebase/firebase'
import { getDisplayName } from '../utils'
import SelectionButton from './SelectionButton'
import { Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'

const UserListItem = ({ user, onPress, isSelected }) => {

    const colorScheme = useColorScheme()
    const [userData, setUserData] = useState(null)
    const styles = StyleSheet.create({
        mainContainer: {
            borderRadius: 15,
            padding: 15,
            backgroundColor: colorScheme === 'light' ? 'white' : '00000090',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 15,
            ...SHADOWS[colorScheme],
            justifyContent: 'space-between'


        }
    })

    useEffect(() => {
        db.collection('users')
            .doc(user.id)
            .get()
            .then(doc => setUserData(doc.data()))



    }, [])


    return (

        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ProfileButton />
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, marginLeft: 10, fontSize: 18 }}>{userData?.displayName}</Text>
                </View>
                <SelectionButton
                    onSelect={onPress}
                    isSelected={isSelected}
                />

            </View>




        </TouchableWithoutFeedback>

    )
}






export default UserListItem