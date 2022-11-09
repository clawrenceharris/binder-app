import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserProfileCircle from './UserProfileCircle'
import { db } from '../Firebase/firebase'
import { getDisplayName } from '../utils'
import SelectionButton from './SelectionButton'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'

const UserListItem = ({ user, isTop, isBottom }) => {
    const [userData, setUserData] = useState('')
    useEffect(() => {
        if (user?.uid) {
            db.collection('users').doc(user.uid).get().then(doc => {
                setUserData(doc.data())
            })

        }


    }, [])


    const styles = StyleSheet.create({
        mainContainer: {
            borderRadius: 15,
            padding: 15,
            backgroundColor: '#292929',
            flexDirection: 'row',
            alignItems: 'center',
            borderTopLeftRadius: isTop ? 15 : 0,
            borderTopRightRadius: isTop ? 15 : 0,
            borderBottomLeftRadius: isBottom ? 15 : 0,
            borderBottomRightRadius: isBottom ? 15 : 0,
            borderBottomColor: '#505050',
            borderBottomWidth: !isBottom && 1,
            justifyContent: 'space-between'


        }
    })





    return (

        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <UserProfileCircle user={userData} size={40} />
                <Text style={{ fontFamily: 'Kanit', color: 'white', marginLeft: 10, fontSize: 18 }}>{getDisplayName(userData?.firstName, userData?.lastName)}</Text>

            </View>



        </View>

    )
}

export default UserListItem