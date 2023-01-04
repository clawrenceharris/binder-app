import { View, Text, Image, FlatList, useColorScheme, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ConfirmationModal from '../components/ConfirmationModal';
import OptionsModal from '../components/OptionsModal';
import Button from '../components/Button';
import Header from '../components/Header';
import { assets, Colors } from '../constants';
import DeskItemPreview from '../components/DeskItemPreview';
import { auth, db } from '../Firebase/firebase';
import firebase from 'firebase/compat'
import { ActivityBadge } from '../components/ProfileBadges';
import { ProfileButton } from '../components';
import MoreButton from '../components/MoreButton';
import { SHADOWS } from '../constants/Theme';
import { haptics } from '../utils';
import FilterTag from '../components/FilterTag';

const DeskItems = ({ route, navigation }) => {
    const [desk, setDesk] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const deskType = route.params.deskType
    const [selectedDeskItem, setSelectedDeskItem] = useState(null)
    const colorScheme = useColorScheme()
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [results, setResults] = useState([])
    const [filters, setFilters] = useState([])
    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {
                navigation.openDrawer()
            }}

            badgeContainerStyle={{ backgroundColor: Colors.primary, top: '55%', left: '65%' }}
            badge={ActivityBadge()}
            showsName={true}


        />

    )

    useEffect(() => {


        const classes = [];
        // if (selectedClass == null) {
        //     db.collection('desks')
        //         .doc(auth.currentUser.uid)
        //         .collection(deskType.toLowerCase())
        //         .where("class", "==", { id: selectedClass.id, name: selectedClass.name })
        //         .get()
        //         .then(query => {
        //             setDesk(query.docs.map((doc) => (
        //                 {
        //                     data: doc.data(),
        //                     id: doc.id
        //                 }
        //             )))
        //             setLoading(false)

        //         })
        // }
        // else {
        db.collection('desks')
            .doc(auth.currentUser.uid)
            .collection(deskType.toLowerCase())
            .get()
            .then(query => {
                setDesk(query.docs.map((doc) => (
                    {
                        data: doc.data(),
                        id: doc.id
                    }
                )))
                setResults(query.docs.map((doc) => (
                    {
                        data: doc.data(),
                        id: doc.id
                    }
                )))
                setLoading(false)

            })

        // }



        db.collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(doc => {
                doc.data().classes.forEach(item => {
                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .collection('classes')
                        .doc(item.id)
                        .get()
                        .then(doc => {
                            classes.push(doc.data())
                            setClasses(classes)
                        })
                })

                    .map((doc) => ({
                        id: doc.id,
                        data: doc.data()

                    }))
            })




    }, [])


    const onNewPress = () => {

        setShowModal(false)

        navigation.navigate('NewDeskItemUpload', { deskType: deskType })


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
        console.log("bookmark pressed")
    }



    const toggleIsPublic = () => {
        db.collection(deskType.toLowerCase())
            .doc(selectedDeskItem.id)
            .update({
                isPublic: !selectedDeskItem.isPublic
            })
    }
    const deleteDeskItem = () => {
        setShowDeskItemModal(false)
        db.collection(deskType.toLowerCase())
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
        //navigation.navigate('BookmarkedItems', { deskType: deskType, deskItems: getData() })
    }


    const onSharePress = () => {

    }
    const onEditPress = () => {

    }

    const filterData = (item) => {
        setResults([])
        if (!isSelected(item)) {

            setResults(desk.filter(item => item.data.class?.name !== selectedClass?.name))
        }
        else {

            setResults(desk)
        }


    }
    const isSelected = (item) => {

        return item === selectedClass
    }




    const onSelect = (item) => {
        if (item === selectedClass) //if we select an item that is already selected
        {
            filterData(item)
            setSelectedClass(null)

            return
        }

        filterData(item)
        setSelectedClass(item); // add item to selected items array






    }
    const headerRight = () => (

        <MoreButton onPress={() => setShowModal(true)} />
    )
    return (
        <View style={{ flex: 1 }}>
            <Header
                title={'Your ' + deskType}

                headerRight={headerRight()}
                navigation={navigation}
                style={{ backgroundColor: Colors.primary, height: 170, zIndex: 0 }}

            />


            <ScrollView
                style={{ position: 'absolute', top: '20%', zIndex: 1, width: '100%' }}
                showsHorizontalScrollIndicator={false}
                horizontal
            >
                {classes.map((item, index) => (
                    <FilterTag
                        data={item.name}
                        isSelected={isSelected(item)}
                        onPress={() => onSelect(item)}
                        style={{ marginLeft: index === 0 && 10 }}
                        key={index.toString()} />
                ))}

            </ScrollView>

            <Button
                onPress={onNewPress}
                style={{ borderRadius: 50, position: 'absolute', bottom: 30, right: 20, width: 60, height: 60, ...SHADOWS[colorScheme] }}
                icon={<Image source={assets.add} style={{ width: 20, height: 20, tintColor: 'white' }} />}
            />

            <View style={{ padding: 10, backgroundColor: Colors[colorScheme].background, height: '80%', borderRadius: 15, marginTop: -30 }}>




                <OptionsModal
                    showModal={showModal}
                    options={['Bookmarked ' + deskType, 'New ' + deskType, 'Desk Settings', 'Clear Desk']}
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
                    switchIndex={3}
                    onToggle={toggleIsPublic}
                    isOn={selectedDeskItem?.isPublic}
                    onCancelPress={() => setShowDeskItemModal(false)}
                    onOptionPress={[onBookmarkPress, onSharePress, onEditPress, toggleIsPublic, onDeletePress]}
                />


                <ConfirmationModal
                    message={'Permanently delete these ' + deskType + ' from your Desk? This action cannot be undone'}
                    showModal={showConfirmationModal}
                    onCancelPress={() => setShowConfirmationModal(false)}
                    onConfirmPress={() => { setShowConfirmationModal(false); deleteDeskItem(); }}
                />

                {!desk.length &&
                    <Text style={{ fontFamily: 'Kanit', color: '#00000050', alignSelf: 'center', marginTop: '50%' }}>{"This desk is empty 🗃"}</Text>
                }
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '20%' }}>
                    <FlatList

                        style={{ height: '51%' }}
                        data={results}
                        getItemLayout={getItemLayout}
                        numColumns={2}
                        keyExtractor={(item) => item.id}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator
                        renderItem={({ item }) =>




                            <DeskItemPreview
                                bottomFlashcardContainerStyle={{ width: 150, height: 70 }}
                                topContinaerStyle={{ width: 150, height: 40 }}
                                bottomContinaerStyle={{ width: 150 }}
                                style={{ margin: 15 }}
                                item={item.data}
                                onMorePress={(deskItem) => {
                                    setSelectedDeskItem(deskItem);
                                    setShowDeskItemModal(true);
                                }}
                                onPress={(deskItemData) => navigation.navigate('DeskItem', { deskItem: item.data, deskType: deskType })}

                                onLongPress={(deskItem) => {
                                    haptics('light')
                                    setSelectedDeskItem(deskItem);

                                    setShowDeskItemModal(true)
                                }}

                                deskType={deskType}
                            />

                        }

                    />


                </View>





            </View>

        </View>

    )
}

export default DeskItems