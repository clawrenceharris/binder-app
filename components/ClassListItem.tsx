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
                        nameStyle={{ color: Colors.light.accent }}
                        imageStyle={{ width: 5, height: 5 }}
                    />

                    <View>
                        <Text style={[styles.className, { color: Colors.light.accent }]}>{props.Class?.name}</Text>

                        {props.type !== 'selectable' && <ActivePeople userCount={props.Class?.users?.length} activeCount={props.Class?.active?.length} />}

                    </View>
                    {props.type === 'selectable' && <TouchableOpacity
                        onPress={props.onSelect}
                        activeOpacity={0.7}
                        style={{ position: 'absolute', right: 10 }}>

                        <View style={!props.isSelected && styles.addButtonContainer}>
                            {!props.isSelected ? <Text style={{ color: 'white', fontFamily: 'KanitMedium' }}>{"Add"}</Text>
                                :
                                <View style={styles.selected}>
                                    <Image source={assets.check} style={{ width: 28, height: 28, tintColor: Colors.light.accent }} />
                                </View>

                            }
                        </View>
                    </TouchableOpacity>}
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
        borderColor: Colors.light.accent,
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
        backgroundColor:
            Colors.light.accent,
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
        marginLeft: 10,
        width: '95%'



    }
})
export default ClassListItem