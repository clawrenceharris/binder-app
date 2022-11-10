import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from "react-native"
import {
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Entypo,
    Fontisto,
} from '@expo/vector-icons';
import { assets, Colors } from '../constants';
import { Image } from 'react-native';
import { SHADOWS } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import useColorScheme from '../hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default class ChatInput extends React.Component {
    state = {
        message: ''
    }
    constructor(props) {
        super(props)
    }

    onChatBubblePress = () => {

        console.log("chat bubble pressed")
    }


    onSendPress = (content) => {

        this.setState({ message: '' });
        this.props.onSendPress('text', this.state.message)
    }



    render() {

        const styles = StyleSheet.create({

            container: {
                padding: 5,
                backgroundColor: '#404040',
                flexDirection: 'row',
                borderTopColor: 'gray',
                borderTopWidth: 1,
                minHeight: 90,
                alignItems: 'baseline'
            },
            textContainer: {
                flexDirection: 'row',
                padding: 5,
                borderRadius: 25,
                marginBottom: 30,
                marginRight: 10,
                maxHeight: 160,
                flex: 1,
                backgroundColor: '#272727',
                alignItems: 'center',

            },
            textInput: {
                marginHorizontal: 10,
                flex: 1,
                color: 'white',
                fontFamily: 'Kanit',
                fontSize: 16
            },
            icon: {
                marginHorizontal: 5,
            },
            specialChatButton: {
                backgroundColor: '#8C3BD7',
                borderRadius: 25,
                width: 45,
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',


            },
            rightContainer: {
                flexDirection: 'row',
                marginRight: 10,
                alignItems: 'center'
            },
            cameraButton: {
                borderRadius: 50,
                backgroundColor: Colors.light.primary,
                width: 35,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center'
            }
        })

        return (
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"} >
                <View style={styles.container}>

                    <View style={styles.textContainer}>
                        <View style={styles.cameraButton}>
                            <TouchableOpacity onPress={this.props.onCameraPress}>
                                <Image source={assets.camera} style={{ width: 25, height: 25, tintColor: 'white' }} />

                            </TouchableOpacity>

                        </View>
                        <TextInput
                            placeholder={`Send a chat...`}
                            style={styles.textInput}
                            multiline
                            value={this.state.message}
                            onChangeText={(value) => this.setState({ message: value })}
                            placeholderTextColor={'lightgray'}
                            selectionColor={Colors.light.accent}
                            autoFocus



                        />

                        {!this.state.message ? <View style={styles.rightContainer}>
                            <MaterialCommunityIcons name="microphone" size={28} color="grey" style={styles.icon} />
                            <MaterialCommunityIcons name="image" size={28} color="grey" />
                            <Image source={assets.desk} style={{ width: 28, height: 28, tintColor: 'gray', marginLeft: 10 }} />
                        </View>
                            : <TouchableOpacity onPress={this.onSendPress} >


                                <Text style={{
                                    fontWeight: 'bold', fontSize: 16, color: Colors.light.accent, marginRight: 10, fontFamily: 'KanitMedium'
                                }} >Send</Text>
                            </TouchableOpacity>
                        }


                    </View>
                    <TouchableOpacity onPress={this.onChatBubblePress}>
                        <View style={styles.specialChatButton}
                        >
                            <Image source={assets.chat_bubble} style={{ width: 24, height: 24, tintColor: "white" }} />
                        </View>
                    </TouchableOpacity>


                </View>






            </KeyboardAvoidingView >

        )
    }
}


