import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { ProfileButton } from '../components'
import { auth, db } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import OptionsModal from '../components/OptionsModal'
import { Dropdown } from 'react-native-element-dropdown'
import FlashcardsPreview from '../components/FlashcardsPreview'
import { haptics } from '../utils'
import ConfirmationModal from '../components/ConfirmationModal'
import DeskItemPreview from '../components/DeskItemPreview'
import MoreButton from '../components/MoreButton'
import useColorScheme from '../hooks/useColorScheme'
import { ActivityBadge } from '../components/ProfileBadges'

const Desk = ({ navigation }) => {
    const [deskData, setDeskData] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [deskCategory, setDeskCategory] = useState('Notes')
    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const [selectedDeskItem, setSelectedDeskItem] = useState(null)
    const colorScheme = useColorScheme()
    const data = [
        { label: 'Notes', value: 'Notes' },
        { label: 'Flashcards', value: 'Flashcards' },
        { label: 'Study Guides', value: 'Study Guides' },
        { label: 'Readings', value: 'Readings' },
        { label: 'Graded Work', value: 'Graded Work' },
        { label: 'Other', value: 'Other' },
    ]


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
        <MoreButton onPress={() => setShowModal(true)} />

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


    const onBookmarkPress = () => {
        db.collection(deskCategory.toLowerCase())
            .doc(selectedDeskItem.id)
            .update({ bookmarked: !selectedDeskItem.bookmarked })
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


    const onBookmarkedPress = () => {
        setShowModal(false)
        navigation.navigate('BookmarkedItems', { deskCategory: deskCategory, deskItems: getData() })
    }

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
        <View style={{ flex: 1 }}>
            <Header
                title={'Desk'}
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                navigation={navigation}
                style={{ backgroundColor: Colors.light.accent, height: 200, zIndex: 0 }}

            />
            <View style={{ padding: 20, backgroundColor: Colors[colorScheme].background, height: '100%', borderRadius: 25, marginTop: -30 }}>
                <View style={{ flexDirection: 'row' }}>


                    <Dropdown
                        data={data}
                        value={deskCategory}
                        onChange={item => { setDeskCategory(item.value) }}
                        placeholderStyle={{ color: 'darkgray', fontFamily: 'Kanit' }}
                        style={{ flex: 1, borderRadius: 15, backgroundColor: '#00000030', padding: 10 }}
                        maxHeight={400}
                        containerStyle={{ backgroundColor: 'lightgray', borderWidth: 0, borderRadius: 15 }}
                        labelField="label"
                        valueField="value"
                        itemContainerStyle={{ backgroundColor: 'lightgray', borderRadius: 15 }}
                        itemTextStyle={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint }}
                        selectedTextStyle={{ fontFamily: 'KanitBold', color: Colors[colorScheme].accent }}
                        fontFamily='KanitSemiBold'
                        showsVerticalScrollIndicator={false}
                        autoScroll={false}
                        placeholder={deskCategory}
                    />

                    <TouchableOpacity
                        onPress={onNewPress}
                        style={{ backgroundColor: Colors.light.accent, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginLeft: 20, padding: 10, flexDirection: 'row' }}>
                        <Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />
                        <Text style={{ fontFamily: 'KanitSemiBold', color: 'white', fontSize: 18, marginLeft: 10 }}>{"New"}</Text>
                    </TouchableOpacity>
                </View>

                <OptionsModal
                    showModal={showModal}
                    options={['Bookmarked ' + deskCategory, 'New ' + deskCategory, 'Desk Settings', 'Clear Desk']}
                    redIndex={2}
                    toValue={-350}
                    onCancelPress={() => setShowModal(false)}
                    onOptionPress={[onBookmarkedPress, onNewPress, onDeskSettingsPress, onClearDeskPress]}
                />

                <OptionsModal
                    showModal={showDeskItemModal}
                    options={['Bookmark', 'Share', 'Edit', 'Public', 'Delete']}
                    redIndex={5}
                    toValue={-460}
                    switchIndex={4}
                    onToggle={toggleIsPublic}
                    isOn={selectedDeskItem?.isPublic}
                    onCancelPress={() => setShowDeskItemModal(false)}
                    onOptionPress={[onBookmarkPress, onSharePress, onEditPress, toggleIsPublic, onDeletePress]}
                />


                <ConfirmationModal
                    message={'Permanently delete these ' + deskCategory + ' from your Desk? This action cannot be undone'}
                    showModal={showConfirmationModal}
                    onCancelPress={() => setShowConfirmationModal(false)}
                    onConfirmPress={() => { setShowConfirmationModal(false); deleteDeskItem(); }}
                />


                <Text style={{ fontFamily: 'Kanit' }}></Text>


                {getData()?.length === 0 && <Text style={{ color: 'gray', fontFamily: 'Kanit', alignSelf: 'center' }}>{"This is Desk is empty. "}</Text>}

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



        </View>
    )
}

export default Desk