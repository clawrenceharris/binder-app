import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { UserProfileCircle } from '../components'
import { auth, db } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import NotePost from '../components/NotePost'
import NotesComponent from '../components/ScrollableImages'
import NotesMessage from '../components/NotesPreview'
import NotesPreview from '../components/NotesPreview'
import OptionsModal from '../components/OptionsModal'
import { Dropdown } from 'react-native-element-dropdown'
import FlashcardsPreview from '../components/FlashcardsPreview'
import { haptics } from '../utils'
import ConfirmationModal from '../components/ConfirmationModal'
import DeskItemPreview from '../components/DeskItemPreview'

const Desk = ({ navigation }) => {
    const [deskData, setDeskData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [deskCategory, setDeskCategory] = useState('Notes')
    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const [selectedDeskItem, setSelectedDeskItem] = useState(null)

    const data = [
        { label: 'Notes', value: 'Notes' },
        { label: 'Flashcards', value: 'Flashcards' },
        { label: 'Study Guides', value: 'Study Guides' },
        { label: 'Readings', value: 'Readings' },
        { label: 'Graded Work', value: 'Graded Work' },
        { label: 'Other', value: 'Other' },
    ]


    const headerLeft = () => (
        <UserProfileCircle
            user={auth.currentUser}
            size={40} showName={false}
            showStoryBoder bold={false}
            showStudyBuddy={false}
            showActive
            navigation={navigation}
        />

    )

    const headerRight = () => (
        <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />
        </TouchableOpacity>
    )

    console.log("Show", showConfirmationModal)

    useEffect(() => {

        const subscriber = db

            .collection('desks')
            .doc(auth.currentUser.uid)
            .onSnapshot(desk => {
                //if desk exists, then get its data
                if (desk.exists) {

                    setDeskData(desk.data())


                }

                else {
                    //if desk does not exist yet, then create it
                    db
                        .collection('desks')
                        .doc(auth.currentUser.uid)
                        .set({
                            notes: [],
                            flashcards: [],
                            studyGuides: [],
                            gradedWork: [],
                            readings: [],
                            games: [],

                        })
                }
            })


        return () => {
            subscriber()
        }
    }, [])


    const onNewPress = () => {
        console.log("New  pressed")
        setShowModal(false)

        navigation.navigate('NewDeskItem', { deskCategory: deskCategory })



    }

    const onDeskSettingsPress = () => {
        console.log("Desk settings pressed")
        setShowModal(false)
    }

    const onClearDeskPress = () => {
        console.log("Clear Desk pressed")
        setShowModal(false)

    }

    const onPinPress = () => {

    }

    const onBookmarkPress = () => {

    }


    const onSharePress = () => {

    }

    const onEditPress = () => {

    }

    const toggleIsPublic = () => {
        db.collection(deskCategory.toLowerCase())
            .doc(selectedDeskItem.id)
            .update({
                isPublic: !selectedDeskItem.isPublic
            })
    }
    const deleteDeskItem = () => {
        setShowDeskItemModal(false)
        db.collection(deskCategory.toLowerCase())
            .doc(selectedDeskItem.id)
            .delete()
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .update({
                notes: firebase.firestore.FieldValue.arrayRemove(db.collection('notes').doc(selectedDeskItem.id)),
                flashcards: firebase.firestore.FieldValue.arrayRemove(db.collection('flashcards').doc(selectedDeskItem.id))
            })

    }
    const onDeletePress = () => {
        console.log("delete press");
        setShowDeskItemModal(false);
        setShowConfirmationModal(true);

    }


    const getItemLayout = (data, index) => {
        const productHeight = 80;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };

    const getData = () => {
        switch (deskCategory) {
            case 'Notes': return deskData?.notes
            case 'Flashcards': return deskData?.flashcards
            case 'Study Guides': return deskData?.studyGuides
            case 'Readings': return deskData?.readings
            case 'Graded Work': return deskData?.gradedWork
            case 'Other': return deskData?.other
        }
        return []
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                title={'Desk'}
                shadow
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                navigation={navigation}

            />
            <View style={{ padding: 20 }}>

                <Dropdown
                    data={data}
                    value={deskCategory}
                    onChange={item => { setDeskCategory(item.value) }}
                    placeholderStyle={{ color: 'darkgray', fontFamily: 'Kanit' }}
                    style={{ width: '100%', borderRadius: 15, backgroundColor: '#272727', padding: 10 }}
                    maxHeight={400}
                    containerStyle={{ backgroundColor: '#272727', borderWidth: 0, borderRadius: 15 }}
                    labelField="label"
                    valueField="value"
                    itemContainerStyle={{ backgroundColor: '#272727', borderRadius: 15 }}
                    itemTextStyle={{ fontFamily: 'Kanit', color: 'darkgray' }}
                    selectedTextStyle={{ fontFamily: 'KanitBold', color: Colors.light.primary }}
                    fontFamily='Kanit'
                    showsVerticalScrollIndicator={false}
                    autoScroll={false}
                    placeholder={deskCategory}
                />

                <TouchableOpacity
                    onPress={onNewPress}
                    style={{ backgroundColor: Colors.light.accent, borderRadius: 50, justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row', marginTop: 10, width: '60%' }}>
                    <Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />
                    <Text style={{ fontFamily: 'KanitSemiBold', color: 'white', fontSize: 18, marginLeft: 10 }}>{"New " + deskCategory}</Text>
                </TouchableOpacity>

                <OptionsModal
                    showModal={showModal}
                    options={['New ' + deskCategory, 'Desk Settings', 'Clear Desk']}
                    redIndex={2}
                    toValue={-300}
                    onCancelPress={() => setShowModal(false)}
                    onOptionPress={[onNewPress, onDeskSettingsPress, onClearDeskPress]}
                />

                <OptionsModal
                    showModal={showDeskItemModal}
                    options={['Pin', 'Bookmark', 'Share', 'Edit', 'Public', 'Delete']}
                    redIndex={5}
                    toValue={-460}
                    switchIndex={4}
                    onToggle={toggleIsPublic}
                    isOn={selectedDeskItem?.isPublic}
                    onCancelPress={() => setShowDeskItemModal(false)}
                    onOptionPress={[onPinPress, onBookmarkPress, onSharePress, onEditPress, toggleIsPublic, onDeletePress]}
                />


                <ConfirmationModal
                    message={'Permanently delete these ' + deskCategory + ' from your Desk? This action cannot be undone'}
                    showModal={showConfirmationModal}
                    onCancelPress={() => setShowConfirmationModal(false)}
                    onConfirmPress={() => { setShowConfirmationModal(false); deleteDeskItem(); }}
                />


                <Text style={{ fontFamily: 'Kanit' }}></Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <FlatList

                    style={{ height: '51%' }}
                    data={getData()}
                    getItemLayout={getItemLayout}
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator
                    renderItem={({ item }) =>
                        deskCategory === 'Flashcards' ?

                            <View>
                                <FlashcardsPreview
                                    margin={10}
                                    flashcards={item}

                                    onLongPress={(deskItem) => {

                                        haptics('light')
                                        setSelectedDeskItem(deskItem);
                                        setShowDeskItemModal(true)
                                    }} />
                            </View>
                            :

                            <View>
                                <DeskItemPreview
                                    margin={10}
                                    item={item}
                                    onMorePress={(deskItem) => {
                                        setSelectedDeskItem(deskItem);
                                        setShowDeskItemModal(true);
                                    }}
                                    onLongPress={(deskItem) => {
                                        haptics('light')
                                        setSelectedDeskItem(deskItem);
                                        setShowDeskItemModal(true)
                                    }}

                                    deskCategory={deskCategory}
                                />
                            </View>
                    }

                />


            </View>




        </View>
    )
}

export default Desk