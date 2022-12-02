import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants'
import { Image } from 'react-native'
import { db } from '../Firebase/firebase'



const ProfileCircle = (props) => {
    const [studyBuddies, setStudyBuddies] = useState([])
    const [userData, setUserData] = useState(null)
    useEffect(() => {



        const subscriber = db.collection('users')
            .doc(user)
            .onSnapshot(doc => {
                setUserData(doc.data())
            })

        return () => subscriber()


    }, [])

    return (

        <View
        // onPress={navigation ? () => {
        //     auth.currentUser.uid === user?.uid ?
        //         navigation.openDrawer() :
        //         navigation.navigate('Profile', { user: user, class: null })
        // } : null} 
        >
            <View style={[{ alignItems: 'center' }, { ...containerStyle }]}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#00000020', borderRadius: 100 }}>


                    {showActive &&

                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.light.accent,
                            width: 15,
                            height: 15,
                            borderRadius: 100,
                            zIndex: 1,
                            position: 'absolute',
                            left: size - (size / 3),
                            top: size - (size / 3)
                        }}
                        >
                            <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 100, zIndex: 1 }} />

                        </View>
                    }


                    <View style={{ borderRadius: 100, alignItems: 'center', overflow: 'hidden', width: size, height: size, justifyContent: 'center' }}>
                        {userData?.photoURL ? <Image source={{ uri: userData?.photoURL }} style={[styles.image, { width: size, height: size, zIndex: 0 }]} />
                            : <Image source={assets.person} style={[styles.defaultImage, { width: size - (size / 3), height: size - (size / 3) }]} />}
                    </View>

                    {studyBuddies.includes(db.collection('users').doc(user)) && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', padding: 4, backgroundColor: '#333', borderRadius: 50, right: -15, top: 20 }}>
                        <Text style={{ fontSize: (size / 3) }}>🤓</Text>

                    </View>}

                </View>
                {showName && <Text style={{ fontFamily: 'KanitBold', fontSize: 20, color: 'white', marginLeft: 10 }}>{userData?.displayName}</Text>}


            </View>


        </View>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'cover',
        tintColor: '#00000050',
    },

    image: {
        resizeMode: 'cover',
    },



})
export default UserProfileCircle