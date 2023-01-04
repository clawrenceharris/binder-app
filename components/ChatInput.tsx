import React, { FC, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { assets, Colors } from '../constants';
import { Image } from 'react-native';
import { Chatroom, ChatroomUser } from '../types';
import { auth, db } from '../Firebase/firebase';
import { getDisplayNameOrYou } from '../utils';
import useColorScheme from '../hooks/useColorScheme';


interface Props {
    onSendPress: (type: string, message: string) => void;
    onCameraPress: () => void;
    onChangeMessage: (value: string) => void;
    onDeskPress: () => void;
    message: string;
    deskItem: object;
    children: JSX.Element;


}

const ChatInput: FC<Props> = (props) => {
    const colorScheme = useColorScheme()
    const [message, setMessage] = useState(props.message)


    const onChatBubblePress = () => {

        console.log("chat bubble pressed")
    }
    useEffect(() => {
        setMessage(props.message)

    }, [props.message])


    const onSendPress = (content) => {
        props.onSendPress('text', message)

        setMessage('');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} >
            {props.children}
            <View style={styles.container}>

                <View style={styles.textContainer}>
                    <View style={styles.cameraButton}>
                        <TouchableOpacity onPress={props.onCameraPress}>
                            <Image source={assets.camera} style={{ width: 25, height: 25, tintColor: 'white' }} />

                        </TouchableOpacity>

                    </View>
                    <TextInput

                        placeholder={`Message...`}
                        style={[styles.textInput, { color: Colors[colorScheme].tint }]}
                        multiline
                        value={message}

                        enablesReturnKeyAutomatically
                        onChangeText={(value) => { setMessage(value); props.onChangeMessage(value) }}
                        placeholderTextColor={'#00000030'}
                        selectionColor={Colors.primary}
                        autoFocus




                    />

                    {!message ? <View style={styles.rightContainer}>
                        <MaterialCommunityIcons name="microphone" size={28} color="grey" style={styles.icon} />
                        <MaterialCommunityIcons name="image" size={28} color="grey" />
                        <TouchableOpacity onPress={props.onDeskPress}>
                            <Image source={assets.desk} style={{ width: 28, height: 28, tintColor: 'gray', marginLeft: 10 }} />

                        </TouchableOpacity>
                    </View>
                        : <TouchableOpacity onPress={onSendPress} >


                            <Text style={{
                                fontWeight: 'bold', fontSize: 16, color: Colors.primary, marginRight: 10, fontFamily: 'KanitMedium'
                            }} >{"Send"}</Text>
                        </TouchableOpacity>
                    }


                </View>
                <TouchableOpacity onPress={onChatBubblePress}>
                    <View style={styles.specialChatButton}>
                        <Image source={assets.chat_bubble} style={{ width: 24, height: 24, tintColor: "white" }} />
                    </View>
                </TouchableOpacity>


            </View>
        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({

    container: {
        padding: 5,
        flexDirection: 'row',
        borderTopColor: 'gray',
        borderTopWidth: 0.2,
        minHeight: 90,
        alignItems: 'baseline',
        backgroundColor: 'transparent'
    },
    textContainer: {
        flexDirection: 'row',
        padding: 5,
        borderRadius: 25,
        marginBottom: 30,
        marginRight: 10,
        maxHeight: 160,
        flex: 1,
        backgroundColor: '#00000010',
        alignItems: 'center',

    },
    textInput: {
        marginHorizontal: 10,
        flex: 1,
        fontFamily: 'Kanit',
        fontSize: 16
    },
    icon: {
        marginHorizontal: 5,
    },
    specialChatButton: {
        backgroundColor: Colors.primary,
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
        backgroundColor: Colors.accent,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ChatInput