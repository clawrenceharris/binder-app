import { View, Text, FlatList, Image, StyleSheet, ScrollView, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import ModalComponent from '../components/Modal';
import { SHADOWS } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { auth, db, updateCollection } from '../Firebase/firebase';
import { ChatListItem, UserProfileCircle } from '../components';
import Header from '../components/Header';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/compat';
import ClassListItemModal from '../components/ClassListItemModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { getDisplayName } from '../utils';
export default function Chat({ navigation }) {
    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
    ])
    const colorScheme = useColorScheme();
    const [open, setOpen] = useState(false)
    const [classes, setClasses] = useState([])
    const [school, setSchool] = useState(null)
    const [showChatModal, setShowChatModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [chatrooms, setChatrooms] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)


    const headerLeft = () => (

        <UserProfileCircle navigation={navigation} user={auth.currentUser} size={40} showName={false} showStoryBoder bold={false} showStudyBuddy={false} showActive />

    )
    const headerRight = () => (
        <TouchableOpacity style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: Colors[colorScheme].background }} />

        </TouchableOpacity>

    )

    const deleteChat = () => {
        updateCollection('users', auth.currentUser.uid, { chatrooms: firebase.firestore.FieldValue.arrayRemove(db.collection('chatrooms').doc(selectedChat.id)) });

    }


    const onDeletePress = () => {

        setShowChatModal(false);
        setShowConfirmationModal(true);

    }

    useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid).onSnapshot(doc => {

            setChatrooms(doc.data()?.chatrooms)
            if (doc.data().school.id) {
                db.collection('schools').doc(doc.data().school.id).onSnapshot(doc => {
                    setSchool(doc.data())

                });
            }

        })



        return () => subscriber()


    }, [school])

    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }} >
            <ClassListItemModal
                showModal={showChatModal}
                onDeletePress={onDeletePress}
                onPinPress={() => { }}
                onCancelPress={() => setShowChatModal(false)} />

            <ConfirmationModal
                showModal={showConfirmationModal}
                message='This will delete the converstation from your chat list.'
                onConfirmPress={() => { deleteChat(); setShowConfirmationModal(false) }}
                onCancelPress={() => setShowConfirmationModal(false)}
            />
            <Header
                title='Chat'
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                shadow
                navigation={navigation}

            />



            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={school?.logo ? school.logo : assets.school} style={{ width: 20, height: 20, tintColor: Colors.light.primary }} />
                    <Text style={{ margin: 10, fontFamily: 'KanitSemiBold', fontSize: 16, color: Colors.light.primary }}>{school?.name}</Text>
                </View>


                <TouchableOpacity
                    onPress={() => navigation.navigate('NewChat')}
                    style={{ padding: 5, backgroundColor: Colors.light.primary, borderRadius: 50, flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={assets.new_chat} style={{ width: 20, height: 20, tintColor: 'white', marginRight: 5 }} />

                    <Text style={{ fontFamily: 'KanitMedium', color: 'white' }}>New Chat</Text>

                </TouchableOpacity>
            </View>

            {

                chatrooms?.length > 0 ?
                    <FlatList
                        data={chatrooms}
                        renderItem={({ item }) =>
                            <ChatListItem
                                chatroom={item}
                                onPress={() => {
                                    navigation.navigate('Chatroom', { chatroom: item?.id })
                                }}
                                onLongPress={() => {
                                    setShowChatModal(true);
                                    setSelectedChat(item)
                                }} />
                        }
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        scrollEnabled={true}

                    />
                    :

                    <View style={{ ...SHADOWS.dark, width: '100%', borderRadius: 15, backgroundColor: '#5B5B5B', padding: 10, alignItems: 'center', justifyContent: 'center' }}>

                        <View>
                            <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`💬 This is where all your chats with ${school?.name} students will appear.`}</Text>
                            <View style={{ backgroundColor: Colors.light.primary }}>

                            </View>
                        </View>
                    </View>

            }





        </View >


    )
}