import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { assets, Colors } from '../constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import ChatMessage from '../components/ChatMessage'
import { ImageBackground } from 'react-native'
import ChatInput from '../components/ChatInput'
import { GiftedChat } from 'react-native-gifted-chat'
import { auth, db } from '../Firebase/firebase'
import Header from '../components/Header'
import firebase from 'firebase/compat'
import BackButton from '../components/BackButton'
import { UserProfileCircle } from '../components'
import GroupProfileCircle from '../components/GroupProfileCircle'
import { faker } from '@faker-js/faker'
const ICON_SIZE = 30;

//route.params = chatRoom, class
const Chatroom = () => {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([])
    const [chatroomData, setChatroomData] = useState(null)
    const [ref, setRef] = useState(null)
    const route = useRoute()
    const colors = [Colors.light.primary, '#FFF02B', Colors.light.red, '#8BFF5D']
    const [users, setUsers] = useState([])
    //  useLayoutEffect(() => {
    //     const unsubscribe = db

    //     .collection('chats') 
    //     .orderBy('createdAt', 'desc')
    //     .onSnapshot(snapshot => 

    //         setMessages(
    //         snapshot.docs.map(doc => ({
    //             id: doc.data().id,
    //             createdAt: doc.data().createdAt.toDate(),
    //             text: doc.data().text,
    //             user: doc.data().user
    //         }))
    //     ))
    //     return unsubscribe
    // }, [])

    useEffect(() => {
        //get the chatroom data 
        const array = []
        const subscriber = db.collection('chatrooms')

            .doc(route.params.chatroom)
            .onSnapshot(doc => {
                setChatroomData(doc.data())
                doc.data().users.filter(user => user.uid != auth.currentUser.uid).forEach((user, index) => {
                    array.push({
                        ...user,
                        color: colors[index]

                    })
                    setUsers(array)
                })

                setMessages(chatroomData?.messages)
            })



        return () => subscriber()


    }, [messages])


    const onSendPress = (contentType, text) => {

        db
            .collection(`chatrooms`)
            .doc(chatroomData.id)
            .update({

                messages: firebase.firestore.FieldValue.arrayUnion({
                    id: faker.datatype.uuid(),
                    createdAt: new Date(),
                    contentType: contentType,
                    text: text,
                    user: auth.currentUser.uid,
                    reactions: [],

                })

            })
        db.collection('chatrooms')
            .doc(chatroomData.id)
            .get()
            .then((doc) => {   // on successful message update
                doc.data().users.forEach(user => { // for each user in the chatroom
                    db
                        .collection('users')
                        .doc(user.uid)
                        .update({
                            chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(chatroomData.id)) //add this chatroom to their database
                        })
                })

            })

    }



    const headerLeft = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BackButton
                navigation={navigation}
                direction='horizontal'
                color='white'
            />
            {chatroomData?.type == 'private' ? <UserProfileCircle size={40} user={chatroomData?.users[0]} showName margin={10} />

                :
                chatroomData?.type == 'group' && <GroupProfileCircle size={40} chatroom={chatroomData} showName margin={10} />}

        </View>
    )

    const headerRight = () => (
        <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />
        </TouchableOpacity>

    )

    const getSender = (message) => {
        console.log(message.user.uid, " == ", users[0].uid)
    }
    return (

        <View style={{ flex: 1, backgroundColor: '#404040' }}>
            <Header
                headerLeft={headerLeft()}
                headerRight={headerRight()}
            />

            <FlatList
                data={messages}
                renderItem={({ item }) =>
                    <ChatMessage message={item} user={users.filter(user => user.uid === item.user)[0]} />}
                style={{ padding: 10 }}
                onContentSizeChange={() => ref.scrollToEnd({ animated: true })}
                ref={(ref) => { setRef(ref) }}
            />



            <ChatInput onCameraPress={() => { }} onSendPress={onSendPress} />


        </View >

    )
}






const styles = StyleSheet.create({


    icon: {
        tintColor:
            Colors.light.tint,
        width: ICON_SIZE,
        height: ICON_SIZE

    },
    classHeader: {
        padding: 30,
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'



    },

    className: {
        fontSize: 20,
        fontWeight: '600',

    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    }
})

export default Chatroom