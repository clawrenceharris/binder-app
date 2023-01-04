import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileButton from './ProfileButton'
import { db } from '../Firebase/firebase'
import SelectionButton from './SelectionButton'
import { Colors } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { ActivityBadge } from './ProfileBadges'

const UserListItem = ({ user, onPress, isSelected }) => {

    const colorScheme = useColorScheme()
    const styles = StyleSheet.create({
        mainContainer: {
            borderRadius: 15,
            padding: 15,
            backgroundColor: colorScheme === 'light' ? 'white' : '00000090',
            flexDirection: 'row',
            alignItems: 'center',
            ...SHADOWS[colorScheme],
            justifyContent: 'space-between'


        }
    })




    return (

        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.mainContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ProfileButton
                        imageURL={user?.photoURL || null}
                        badge={ActivityBadge()}
                        badgeContainerStyle={{ backgroundColor: 'white', top: '55%', left: '65%' }}


                    />
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, marginLeft: 10, fontSize: 18 }}>{user?.displayName}</Text>
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