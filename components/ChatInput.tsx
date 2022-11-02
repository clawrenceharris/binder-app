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

const ChatInput = ({ Class, chatRoom }) => {
    const colorScheme = useColorScheme()

    const [message, setMessage] = useState('');
    const navigation = useNavigation()
    var chatBubblePressed = false
    const onChatBubblePress = () => {
        chatBubblePressed = true;

    }

    const updateChatRoomLastMessage = async (messageId: string) => {

    }

    const onSendPress = async () => {

        setMessage('');
    }

    const onCameraPress = async () => {
        navigation.navigate('Camera', { class: Class, chatRoom: chatRoom })
    }

    const onPress = () => {
        if (!message) {
            onChatBubblePress();
        } else {
            onSendPress();
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={100}
            style={{ width: '100%' }}
        >

            <View style={[styles.container, { backgroundColor: Colors[colorScheme].background }]}>

                <View style={[
                    styles.textContainer, {
                        backgroundColor: colorScheme === 'dark' ? '#1E1E1E' : '#f4f4f4',
                        alignItems: 'center',
                    }]}
                >
                    <View style={styles.cameraButton}>
                        <TouchableOpacity onPressOut={onCameraPress}>
                            <Image source={assets.camera} style={{ width: 25, height: 25, tintColor: 'white' }} />

                        </TouchableOpacity>

                    </View>
                    <TextInput
                        placeholder={'Message...'}
                        style={[styles.textInput, { color: Colors[colorScheme].tint }]}
                        multiline
                        value={message}
                        onChangeText={setMessage}
                        placeholderTextColor={colorScheme === 'dark' ? 'lightgray' : 'gray'}
                        selectionColor={Colors.light.accent}



                    />

                    {!message ? <View style={styles.rightContainer}>
                        <MaterialCommunityIcons name="microphone" size={28} color="grey" style={styles.icon} />
                        <MaterialCommunityIcons name="image" size={28} color="grey" />
                        <Image source={assets.desk} style={{ width: 28, height: 28, tintColor: 'gray', marginLeft: 10 }} />
                    </View>
                        : <TouchableOpacity onPress={onSendPress} >


                            <Text style={{
                                fontWeight: 'bold', fontSize: 16, color: Colors.light.accent, marginRight: 10, fontFamily: 'KanitMedium'
                            }} >Send</Text>
                        </TouchableOpacity>
                    }


                </View>
                <TouchableOpacity onPress={onChatBubblePress}>
                    <View style={styles.specialChatButton}
                    >
                        <Image source={assets.chat_bubble} style={{ width: 24, height: 24, tintColor: "white" }} />
                    </View>
                </TouchableOpacity>


            </View>






        </KeyboardAvoidingView >

    )
}

const styles = StyleSheet.create({

    container: {
        padding: 10,

        flexDirection: 'row',



    },


    textContainer: {

        flexDirection: 'row',
        padding: 5,
        borderRadius: 25,
        marginBottom: 30,
        marginRight: 10,
        maxHeight: 160,
        flex: 1,




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


export default ChatInput;