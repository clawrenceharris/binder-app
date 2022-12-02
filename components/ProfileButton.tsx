import { View, Text, ViewStyle, TextStyle, Image, ImageSourcePropType, ImageStyle } from 'react-native'
import React, { Component, FC, ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { StyleSheet } from 'react-native'
import { assets, Colors } from '../constants';

interface ProfileButtonProps {
    onPress?: () => void;
    showsName?: boolean;
    buttonStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    badgeContainerStyle?: ViewStyle;
    nameStyle?: TextStyle;
    size?: number;
    imageURL?: string
    defaultImage?: ImageSourcePropType;
    badge?: ReactNode;
    name?: string;
    defaultImageStyle?: ImageStyle;
    imageStyle?: ImageStyle;

}
//A profile button component that represents a user or a group profile and can be clicked on to navigate to their profile screen
const ProfileButton: FC<ProfileButtonProps> = (props) => {

    /*  @param onPress - the function that is called when the button is clicked
        @param badge - the badge that the profile will have 
        @param showsName - determines if the button should display the name and the button in a single view.( default flexDirection is 'row')
        @param photoURL - the photo URL for the profile
        @param defaultPhoto - the source to the default image to be displayed if no profile photo
        @param containerStyle - the style of the main container
        @param buttonStyle - the style of the button 
    */


    return (

        <TouchableWithoutFeedback onPress={props?.onPress}>
            <View style={[
                { flexDirection: 'row', alignItems: 'center' },
                { ...props.containerStyle }
            ]}>


                <View style={[styles.buttonContainer, { width: props.size || 50, height: props.size || 50, ...props.buttonStyle }]}>

                    <View
                        style={[styles.imageContainer, { width: props.size || 50, height: props.size || 50, }]}>

                        {
                            props?.imageURL &&

                            <Image
                                source={{ uri: props.imageURL }}
                                style={[styles.image, { width: props.size - 10 || 50, height: props.size - 10 || 50, ...props.imageStyle }]} />
                        }

                        {
                            <Image
                                source={props.defaultImage || assets.logo_cube}
                                style={[styles.defaultImage, { width: props.size - 10 || 40, height: props.size - 10 || 40, ...props.defaultImageStyle, }]} />
                        }

                    </View>


                    <View style={[
                        styles.badgeContainer, {


                            ...props.badgeContainerStyle,
                        }]}>


                        {props.badge}


                    </View>

                </View>
                {
                    props.showsName &&
                    <Text
                        numberOfLines={2}
                        style={[{ fontFamily: 'KanitBold', fontSize: 18, color: 'white', marginLeft: 10, width: '60%' }, { ...props.nameStyle }]}>
                        {props.name}
                    </Text>
                }

            </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({

    buttonContainer: {
        backgroundColor: '#00000020',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',


    },

    defaultImage: {
        resizeMode: 'cover',
        tintColor: '#00000050',


    },

    image: {
        resizeMode: 'cover',
    },

    imageContainer: {
        borderRadius: 100,
        alignItems: 'center',
        overflow: 'hidden',
        justifyContent: 'center',


    },

    badgeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        padding: 5

    }



})
export default ProfileButton