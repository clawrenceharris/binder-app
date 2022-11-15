import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const IMAGE_SIZE = 35;
const ClassProfileCircle = ({ Class, showStoryBoder, story, size, showName, bold, chatroom }) => {
    const colorScheme = useColorScheme()
    const navigation = useNavigation()

    const hasStory = () => {
        return story.length > 0
    }

    const showStory = () => {

    }

    const goToProfile = () => {
        navigation.navigate('Profile', { user: undefined, class: Class })

    }
    return (
        <TouchableWithoutFeedback onPress={hasStory() ? showStory : goToProfile}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {showStoryBoder && <View style={{ position: 'absolute', width: size + 10, height: size + 10, backgroundColor: 'white', borderRadius: 50, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: Colors.light.primary, zIndex: 0 }}>
                </View>}

                <View style={{ width: size + 10, height: size + 10, backgroundColor: 'lightgray', borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
                    {Class.image && <Image source={Class.image} style={[styles.image, { width: size, height: size }]} />}
                    {!Class.image && <Image source={assets.book} style={[styles.defaultImage, { width: size - (size / 3), height: size - (size / 3) }]} />}

                </View>





                {showStoryBoder && <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', width: 25, height: 20, backgroundColor: Colors[colorScheme].background, borderRadius: 50, borderWidth: 3, borderColor: Colors[colorScheme].background, top: size - 5 }}>
                    <Image source={assets.crowd} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />

                </View>}


            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({



    defaultImage: {
        resizeMode: 'contain',
        position: 'absolute',
        tintColor: '#f4f4f4',
    },

    image: {
        resizeMode: 'contain',
        position: 'absolute',
    },



})
export default ClassProfileCircle