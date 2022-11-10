import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet, ScrollView } from "react-native"
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
import { getDisplayName } from '../utils';

const ChatInput = (props) => {


    const [message, setMessage] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])


    const onChatBubblePress = () => {

        console.log("chat bubble pressed")
    }


    const onSendPress = (content) => {
        props.onSendPress('text', message)

        setMessage('');
    }

    const handleSearch = (value) => {
        setIsSearching(true)

        value = value.split('@')[1]



        const filteredData = props.users.filter(item =>
            getDisplayName(item?.firstName, item?.lastName).toLowerCase().includes(value.toLowerCase()

            ))


        if (filteredData.length) {
            return setResults(filteredData)
        }


    }

    function handleKeyPress(key) {

        if (key === '@') {
            setIsSearching(true)

        }
    }





    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"} >

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ flexDirection: 'row', marginBottom: 5, backgroundColor: 'transparent', padding: 5 }}>

                {!isSearching && props.chatroom?.type != 'private' &&
                    props.users?.map((item, index) =>
                        <View style={{ paddingVertical: 2, paddingHorizontal: 10, borderRadius: 50, borderColor: item.color, marginLeft: 10, borderWidth: 2, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 12 }}>{getDisplayName(item.firstName, item.lastName)}</Text>
                        </View>
                    )}


                {isSearching && props.chatroom?.type != 'private' &&

                    results?.map((item, index) =>


                        <TouchableOpacity
                            onPress={() => {
                                const front = message.slice(0, message.indexOf(search))
                                const end = message.slice(message.indexOf(search) + search.length + 1, message.length - 1)
                                console.log(search)
                                setMessage(front + '@' + getDisplayName(item.firstName, item.lastName) + end)
                                setIsSearching(false)

                            }}
                            style={{ paddingVertical: 2, paddingHorizontal: 10, borderRadius: 50, borderColor: item.color, marginLeft: 10, borderWidth: 2, alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 12 }}>{getDisplayName(item.firstName, item.lastName)}</Text>
                        </TouchableOpacity>
                    )

                }

            </ScrollView>


            <View style={styles.container}>

                <View style={styles.textContainer}>
                    <View style={styles.cameraButton}>
                        <TouchableOpacity onPress={props.onCameraPress}>
                            <Image source={assets.camera} style={{ width: 25, height: 25, tintColor: 'white' }} />

                        </TouchableOpacity>

                    </View>
                    <TextInput

                        placeholder={`Message...`}
                        style={styles.textInput}
                        multiline
                        value={message}

                        enablesReturnKeyAutomatically
                        onChangeText={(value) => {
                            setMessage(value);

                            message.split(" ").forEach(item => {
                                if (item[0] === '@') {
                                    handleSearch(item)
                                    setSearch(item)
                                    setIsSearching(true)
                                }

                            })
                        }}
                        placeholderTextColor={'lightgray'}
                        selectionColor={Colors.light.accent}
                        autoFocus




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

export default ChatInput


