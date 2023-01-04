import { View, Text, Image, StyleSheet, FlatList, TouchableWithoutFeedback, ViewStyle, TouchableOpacity } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme'
import Colors from '../constants/Colors'
import { useNavigation } from '@react-navigation/native'
import ActivePeople from './ActivePeople'
import ProfileButton from './ProfileButton'
import ModalComponent from './Modal'
import { SHADOWS } from '../constants/Theme'
import { auth, db, updateCollection } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import { assets } from '../constants'
import { Class } from '../types'
import SelectionButton from './SelectionButton'


interface Props {
    onPress: () => void
    Class: Class
    onLongPress?: () => void
    type: 'selectable' | undefined
    isSelected?: boolean
    onSelect?: () => void
    style: ViewStyle


}
const ClassListItem: FC<Props> = (props) => {
    const colorScheme = useColorScheme()


    return (
        <TouchableWithoutFeedback
            onPress={props.onPress}
            onLongPress={props.onLongPress}
        >
            <View style={[{}, { ...props.style }]}>
                <View style={{ marginBottom: 20, padding: 10, backgroundColor: 'white', borderRadius: 15, ...SHADOWS.light, shadowOpacity: 0.6, shadowRadius: 2, flexDirection: 'row', alignItems: 'center' }}>
                    <ProfileButton
                        defaultImage={assets.book}
                        onPress={props.onPress}
                        size={40}
                    />

                    <View style={{ marginLeft: 10 }}>
                        <Text style={[styles.className, { color: Colors.primary }]}>{props.Class?.name}</Text>

                        {props.type !== 'selectable' &&
                            <ActivePeople userCount={props.Class?.users.length} activeCount={0} />}

                    </View>
                    {props.type === 'selectable' &&
                        <SelectionButton
                            style={{ position: 'absolute', right: 10 }}
                            isSelected={props.isSelected}
                            onSelect={props.onSelect}
                            color={Colors.primary}
                        />
                    }
                </View>

            </View>




        </TouchableWithoutFeedback>

    )
}
const styles = StyleSheet.create({

    avatar: {
        width: 60,
        height: 60
    },


    selected: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: Colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },


    addButtonContainer: {
        alignSelf: 'flex-end',
        padding: 8,
        width: 60,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 50,


    },


    container: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: -1,

        shadowRadius: 2,
        shadowColor: '#272727',
        justifyContent: 'center'

    },
    className: {
        fontSize: 18,
        color: Colors.light.tint,
        marginBottom: 5,
        fontFamily: 'Kanit',

        width: '100%'



    }
})
export default ClassListItem