import { View, Text, FlatList, Image, StyleSheet, ScrollView, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import { assets, Colors } from '../constants/index';
import { SHADOWS, SIZES } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { auth, db, updateCollection } from '../Firebase/firebase';
import { ChatListItem, ProfileButton } from '../components';
import Header from '../components/Header';
import firebase from 'firebase/compat';
import ConfirmationModal from '../components/ConfirmationModal';
import OptionsModal from '../components/OptionsModal';
import * as Haptics from 'expo-haptics'
import useColorScheme from '../hooks/useColorScheme';
import { haptics } from '../utils';
import CircleButton from '../components/CircleButton';
import { ActivityBadge } from '../components/ProfileBadges';

export default function Chat({ navigation }) {
    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
    ])
    const [school, setSchool] = useState(null)
    const [showChatModal, setShowChatModal] = useState(false)
    const colorScheme = useColorScheme()
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [chatrooms, setChatrooms] = useState(null)
    const [selectedChatroom, setSelectedChatroom] = useState(null)

    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {
                navigation.openDrawer()
            }}

            badgeContainerStyle={{ backgroundColor: Colors.light.accent, top: '55%', left: '65%' }}
            badge={ActivityBadge()}

            showsName={true}


        />

    )

    const headerRight = () => (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row' }}>
                <CircleButton
                    onPress={() => { }}
                    source={assets.add} />
                <CircleButton
                    onPress={() => { }}
                    style={{ marginLeft: 10 }}
                    source={assets.more} />
            </View>
        </View>
    )

    const deleteChat = () => {
        updateCollection('users', auth.currentUser.uid, { chatrooms: firebase.firestore.FieldValue.arrayRemove(db.collection('chatrooms').doc(selectedChat.id)) });

    }


    const onDeletePress = () => {

        setShowChatModal(false);
        setShowConfirmationModal(true);

    }

    useEffect(() => {
        const subscriber = db.collection('users').doc(auth.currentUser.uid)

            .onSnapshot(doc => {
                setChatrooms(doc.data()?.chatrooms)

                if (doc.data().school.id) {
                    db.collection('schools').doc(doc.data().school.id)
                        .get()
                        .then(doc => {
                            setSchool(doc.data())

                        });
                }

            })



        return () => subscriber()


    }, [school])


    const onPinPress = () => {

    }
    const onMutePress = () => {
        console.log("mute pressed")

    }

    const onNewChatPress = () => {
        console.log("new chat pressed")

    }


    const onManageChatsPress = () => {
        console.log("manage chats pressed")

    }

    const onLeavePress = () => {
        console.log("leave pressed")

    }
    const onBlockPress = () => {
        console.log("block pressed")
    }

    return (

        <View style={{ flex: 1 }} >


            <OptionsModal
                showModal={showChatModal}
                toValue={-350}
                options={selectedChatroom?.type === 'private' ? ['Pin', 'Mute', 'Delete', 'Block'] : ['Pin', 'Mute', 'Delete', 'Leave Group']}
                onOptionPress={selectedChatroom?.type === 'private' ? [onPinPress, onMutePress, onDeletePress, onBlockPress] : [onPinPress, onMutePress, onDeletePress, onLeavePress]}
                onCancelPress={() => setShowChatModal(false)}
                redIndex={[2, 3]}
            />


            <ConfirmationModal
                showModal={showConfirmationModal}
                message='This will delete the converstation from your chat list. Chats and attachments sent will still be saved.'
                onConfirmPress={() => { deleteChat(); setShowConfirmationModal(false) }}
                onCancelPress={() => setShowConfirmationModal(false)}
            />

            <Header
                title='Chat'
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                style={{ backgroundColor: Colors.light.accent, height: 200, zIndex: 0 }}
                textStyle={{ fontSize: SIZES.huge }}
                navigation={navigation}

            />

            <View style={{ backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 25, marginTop: -30, zIndex: 1 }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={school?.logo ? school.logo : assets.school} style={{ width: 20, height: 20, tintColor: 'gray' }} />
                    <Text style={{ margin: 10, fontFamily: 'Kanit', fontSize: 16, color: 'gray' }}>{school?.name}</Text>
                </View>
                <View style={{ paddingHorizontal: 10, height: '100%' }}>


                    {chatrooms?.length > 0 ?
                        <FlatList

                            data={chatrooms}
                            renderItem={({ item }) =>

                                <ChatListItem

                                    chatroom={item}
                                    onPress={() => {
                                        navigation.navigate('Chatroom', { chatroomID: item?.id })
                                    }}
                                    onLongPress={(chatroom) => {
                                        haptics('light');
                                        setShowChatModal(true);
                                        setSelectedChatroom(chatroom);

                                    }} />


                            }
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={true}

                        />
                        :

                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', height: '75%' }}>

                            <Text style={{ color: 'darkgray', fontFamily: 'Kanit', fontSize: 18, textAlign: 'center' }}>{`This is where all your chats with ${school?.name} students will appear.`}</Text>

                        </View>

                    }

                </View>

            </View>


        </View >


    )
}