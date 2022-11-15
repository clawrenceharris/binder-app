import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Notes } from '../types';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { assets, Colors } from '../constants';
import { StyleSheet } from 'react-native';
import { SHADOWS } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { db } from '../Firebase/firebase';
import { getDisplayNameOrYou } from '../utils';
import moment from 'moment';



const FlashcardsPreview = ({ flashcards, onLongPress, margin }) => {

    const navigation = useNavigation();
    const [flashcardsData, setFlashcardsData] = useState(null)
    const [owner, setOwner] = useState(null)

    console.log(flashcards.id)
    useEffect(() => {
        const subscriber = db.collection('flashcards')
            .doc(flashcards.id)
            .onSnapshot(doc => {
                setFlashcardsData(doc.data())
                if (doc.data()?.ownerUID) {
                    db.collection('users')
                        .doc(doc.data().ownerUID)
                        .get()
                        .then(doc => {
                            setOwner(doc.data())
                        })
                }

            })

        return () => {
            subscriber()
        }
    }, [])
    const styles = StyleSheet.create({

        publicIcon: {
            width: 20,
            height: 20,
            tintColor: flashcardsData?.isPublic ? Colors.light.primary : 'black',

        },
        topContainer: {
            padding: 10,
            width: 160,
            height: 45,
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',

        },

        sectionNumberText: {
            color: 'gray',
            fontFamily: 'Kanit'
        },

        bottomContainer: {
            padding: 10,
            width: 160,
            height: 90,
            backgroundColor: 'white',
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-between',

        },

        titleText: {
            color: Colors.light.primary,
            fontSize: 18,
            textAlign: 'center',
            width: "100%",
            fontFamily: 'KanitBold'
        }

    })
    return (
        <TouchableOpacity
            onLongPress={() => onLongPress(flashcardsData)}
            onPress={() => { navigation.navigate('DeskItem', { deskItem: flashcardsData, deskCategory: 'Flashcards' }) }}
            style={{ margin: margin }}
        >

            <View style={styles.topContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: owner?.photoURL }} style={{ backgroundColor: 'gray', width: 25, height: 25, marginRight: 10, borderRadius: 50 }} />
                    <Text style={{ fontWeight: '500', color: Colors.light.tint, fontFamily: 'Kanit' }}>{getDisplayNameOrYou(owner)}</Text>

                </View>


                <Image source={flashcardsData?.isPublic ? assets.unlock : assets.lock} style={styles.publicIcon} />


            </View>

            <View style={styles.bottomContainer}>
                {flashcardsData?.sectionNumber != null && <Text style={styles.sectionNumberText}>{flashcardsData?.section + " " + flashcardsData?.sectionNumber}</Text>}
                <Text style={styles.titleText}>{flashcardsData?.title}</Text>
            </View>

        </TouchableOpacity>


    )


}
export default FlashcardsPreview