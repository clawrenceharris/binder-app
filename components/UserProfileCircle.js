import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants'
import { Image } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../Firebase/firebase'

const UserProfileCircle = ({ user, size, showStoryBoder, bold, showName, showStudyBuddy, showActive, ...props }) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    const [image, setImage] = useState(null)
    const [studyBuddies, setStudyBuddies] = useState([])
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid)
            .onSnapshot(doc => {
                setImage(doc.data().photoURL);
                setFriends(doc.data().friends)
            })

        return () => subscriber()
    }, [])


    const showStory = () => {

    }

    const goToProfile = () => {
        if (user.uid == auth.currentUser.uid)
            navigation.navigate('CurrentUserProfile', { user: user, class: undefined })
        else {
            navigation.navigate('Profile', { user: user, class: undefined })

        }
    }



    const hasStory = () => {
        return false
    }
    return (

        <TouchableWithoutFeedback onPress={hasStory() ? showStory : goToProfile}>
            <View style={{ flexDirection: props.flexDirection, alignItems: 'center', margin: props.margin }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

                    <View style={{ position: 'absolute', width: size, height: size, backgroundColor: 'gray', borderRadius: 100, justifyContent: 'center', alignItems: 'center', zIndex: 0 }} />

                    {showActive &&

                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#333333', width: 15, height: 15, borderRadius: 100, position: 'absolute', left: 7, top: '60%' }}>
                            <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 100 }} />

                        </View>
                    }



                    {showStoryBoder && hasStory() && <View style={{ width: size + 10, height: size + 10, borderWidth: 3, borderColor: Colors.light.primary, borderRadius: 50 }} />}



                    <View style={{ borderRadius: 100, alignItems: 'center', overflow: 'hidden', width: size, height: size, justifyContent: 'center' }}>
                        {image && <Image source={{ uri: image }} style={[styles.image, { width: size, height: size }]} />}
                        {!image && <Image source={assets.person} style={[styles.defaultImage, { width: size - (size / 3), height: size - (size / 3) }]} />}

                    </View>




                    {studyBuddies.includes(user) && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', padding: 4, backgroundColor: Colors[colorScheme].background, borderRadius: 50, right: -15, top: 20 }}>
                        <Text style={{ fontSize: (size / 3) }}>🤓</Text>

                    </View>}

                </View>


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