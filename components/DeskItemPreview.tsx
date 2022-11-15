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



const DeskItemPreview = ({ item, onLongPress, margin, onMorePress, deskCategory, showBookmarked }) => {
    console.log(deskItemData?.sectionNumber)
    const navigation = useNavigation();
    const [deskItemData, setDeskItemData] = useState(null)
    const [owner, setOwner] = useState(null)
    useEffect(() => {
        const subscriber = db.collection(deskCategory.toLowerCase())
            .doc(item.id)
            .onSnapshot(doc => {
                if (showBookmarked) {
                    if (doc.data().bookmarked) {
                        setDeskItemData(doc.data())
                        db.collection('users')
                            .doc(doc.data().ownerUID)
                            .get()
                            .then(doc => {
                                setOwner(doc.data())
                            })

                    }

                } else {
                    setDeskItemData(doc.data())
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

    return (
        <View
            style={{ margin: margin }}
        >
            <View style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: owner?.photoURL }} style={styles.profileImage} />
                        <Text style={{ fontWeight: '500', color: Colors.light.tint, fontFamily: 'Kanit' }}>{getDisplayNameOrYou(owner)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onMorePress(deskItemData)}>
                        <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'black' }} />

                    </TouchableOpacity>

                </View>

            </View>
            <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => onLongPress(deskItemData)}
                onPress={() => { navigation.navigate('DeskItem', { deskItem: deskItemData, deskCategory: deskCategory }) }}

                style={styles.bottomContainer}>

                {deskItemData?.files?.length > 0 &&

                    <Image source={{ uri: deskItemData?.files[0] }} style={styles.image} />}
                <View style={styles.imageOverlay} />

                <View style={styles.titleContianer}>
                    {deskItemData?.sectionNumber && <Text style={{ color: 'lightgray', fontFamily: 'Kanit' }}>{deskItemData?.section + " " + deskItemData?.sectionNumber}</Text>}
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center', width: "100%", alignSelf: 'center', fontFamily: 'KanitBold' }}>{deskItemData?.title}</Text>
                </View>

                <Image
                    source={deskItemData?.isPublic ? assets.unlock : assets.lock}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: deskItemData?.isPublic ? Colors.light.primary : 'white',
                        position: 'absolute',
                        top: 10,
                        left: 10
                    }} />


                <Image source={assets.unlock} style={styles.image} />

            </TouchableOpacity>



        </View>


    )
}
const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        width: 160,
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    titleContianer: {
        position: 'absolute',
        top: 30,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    image: {
        width: '100%',
        height: '100%',

    },

    profileImage: {
        backgroundColor: 'gray',
        width: 25,
        height: 25,
        marginRight: 10,
        borderRadius: 50
    },

    bottomContainer: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        overflow: 'hidden',
        width: 160,
        height: 170

    },

    imageOverlay: {
        width: 250,
        height: 200,

        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.7

    }
})
export default DeskItemPreview