import { View, Text } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants'
import { Image } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../Firebase/firebase'

const UserProfileCircle = ({ user, size, showStoryBoder, bold, showName, showStudyBuddy, showActive, ...props }) => {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    console.log("USER", user)

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

                    <View style={{ position: 'absolute', width: size, height: size, backgroundColor: colorScheme === 'light' ? '#f2f2f2' : 'darkgray', borderRadius: 100, justifyContent: 'center', alignItems: 'center', zIndex: 0 }} />

                    {showActive &&

                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colorScheme === 'light' ? '#333333' : 'white', width: 15, height: 15, borderRadius: 100, position: 'absolute', left: 7, top: '60%' }}>
                            <View style={{ backgroundColor: '#7FF449', width: 10, height: 10, borderRadius: 100 }} />

                        </View>
                    }



                    {showStoryBoder && hasStory() && <View style={{ width: size + 10, height: size + 10, borderWidth: 3, borderColor: Colors.light.primary, borderRadius: 50 }} />}



                    <View style={{ borderRadius: 100, alignItems: 'center', overflow: 'hidden' }}>
                        {user?.photoURL && <Image source={{ uri: user.photoURL }} style={[styles.image, { width: size, height: size }]} />}

                    </View>


                    {/* {!user.photoURL && <Image source={assets.grad_cap} style={[styles.defaultImage, { width: size - (size / 3), height: size - (size / 3) }]} />} */}


                    {/* {user.studyBuddy && showStudyBuddy && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', padding: 4, backgroundColor: Colors[colorScheme].background, borderRadius: 50, right: -15, top: 20 }}>
                        <Text style={{ fontSize: (size / 3) }}>🤓</Text>

                    </View>} */}

                </View>


            </View>


        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'contain',
        position: 'absolute',
        tintColor: '#D4D4D4',
    },

    image: {
        resizeMode: 'cover',
    },



})
export default UserProfileCircle