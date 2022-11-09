import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants'
import { Image } from 'react-native'
import { auth, db } from '../Firebase/firebase'
import { getDisplayName } from '../utils'

const UserProfileCircle = (props) => {
    const [studyBuddies, setStudyBuddies] = useState([])
    const [userData, setUserData] = useState(null)
    //console.log("USER UID", props.user.uid)

    useEffect(() => {
        const subscriber = db.collection('users').doc(props.user.uid)
            .onSnapshot(doc => {
                setUserData(doc.data())
            })

        return () => subscriber()
    }, [])


    const showStory = () => {

    }





    const hasStory = () => {
        return false
    }
    return (

        <TouchableWithoutFeedback onPress={() => { auth.currentUser.uid === userData?.uid ? props.navigation.openDrawer() : props.navigation.navigate('Profile', { user: props.user, class: null }) }}>
            <View style={{ flexDirection: props.flexDirection ? props.flexDirection : 'row', alignItems: 'center', margin: props.margin }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <View style={{
                        position: 'absolute',
                        width: props.size,
                        height: props.size,
                        backgroundColor: 'gray',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 0
                    }}>
                        {props.showActive &&

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#333333',
                                width: 15,
                                height: 15,
                                borderRadius: 100,
                                position: 'absolute',
                                left: props.size - (props.size / 3),
                                top: props.size - (props.size / 3)
                            }}
                            >
                                <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 100, zIndex: 1 }} />

                            </View>
                        }

                    </View>




                    {props.showStoryBoder && hasStory() && <View style={{ width: props.size + 10, height: props.size + 10, borderWidth: 3, borderColor: Colors.light.primary, borderRadius: 50 }} />}



                    <View style={{ borderRadius: 100, alignItems: 'center', overflow: 'hidden', width: props.size, height: props.size, justifyContent: 'center' }}>
                        {userData?.photoURL ? <Image source={{ uri: userData.photoURL }} style={[styles.image, { width: props.size, height: props.size }]} />
                            : <Image source={assets.person} style={[styles.defaultImage, { width: props.size - (props.size / 3), height: props.size - (props.size / 3) }]} />}

                    </View>




                    {studyBuddies.includes(props.user) && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', padding: 4, backgroundColor: '#333', borderRadius: 50, right: -15, top: 20 }}>
                        <Text style={{ fontSize: (props.size / 3) }}>🤓</Text>

                    </View>}

                </View>
                {props.showName && <Text style={{ fontFamily: 'KanitBold', fontSize: 20, color: 'white', marginLeft: 10 }}>{getDisplayName(userData?.firstName, userData?.lastName)}</Text>}


            </View>


        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'cover',
        tintColor: '#D4D4D4',
    },

    image: {
        resizeMode: 'cover',
    },



})
export default UserProfileCircle