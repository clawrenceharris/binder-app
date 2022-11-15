import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown'
import { openMediaLibrary } from '../utils'
import OptionsModal from '../components/OptionsModal'
import ToggleButton from '../components/ToggleButton'
import ToggleSwitch from 'toggle-switch-react-native'
import Button from '../components/Button'
import { auth, db } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import { faker } from '@faker-js/faker'
import FilterTag from '../components/FilterTag'
const NewDeskItem = ({ navigation }) => {
    const [title, setTitle] = useState('')
    const [sectionNumber, setSectionNumber] = useState('')
    const route = useRoute()
    const [showImageOptionsModal, setShowImageOptionsModal] = useState(false)
    const [isPublic, setIsPublic] = useState(true)
    const [scrollRef, setScrollRef] = useState(null)
    const [imageScrollRef, setImageScrollRef] = useState(null)
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [description, setDescription] = useState('')
    const [images, setImages] = useState([])

    const [cardFront, setCardFront] = useState('')
    const [cardBack, setCardBack] = useState('')

    const [cards, setCards] = useState([])
    const [sectionType, setSectionType] = useState('Chapter')


    const deskCategory = route.params.deskCategory

    const data = [
        { label: 'Chapter', value: 'Chapter' },
        { label: 'Section', value: 'Section' },
        { label: 'Unit', value: 'Unit' },



    ]


    useEffect(() => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(doc => {
                setClasses(doc.data().classes)
            })


    }, [])

    const addImage = (image) => {
        images.push(image)
    }

    const onLibraryPress = async () => {
        setShowImageOptionsModal(false);
        const result = await openMediaLibrary('photo', 10);
        if (result) {
            images.push(result)


        }
    }

    const onTakePicturePress = () => {
        setShowImageOptionsModal(false);
        navigation.navigate('Camera', { canRecord: false, setImage: addImage });
    }

    const onPostPress = () => {
        const id = faker.datatype.uuid()
        if (deskCategory !== 'Flashcards') {
            db.collection(deskCategory.toLowerCase())
                .doc(id)
                .set({
                    id: id,
                    class: selectedClass,
                    title: title,
                    section: !sectionNumber ? null : sectionType,
                    sectionNumber: sectionNumber ? +sectionNumber : null,
                    files: images,
                    description: description,
                    isPublic: isPublic,
                    ownerUID: auth.currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    views: [],
                    comments: [],
                    likes: []

                })
        }


        if (deskCategory === 'Study Guides') {
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .update({
                    studyGuides: firebase.firestore.FieldValue.arrayUnion(db.collection(deskCategory.toLowerCase()).doc(id))
                })
        }

        else if (deskCategory === 'Graded Work') {
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .update({
                    gradedWork: firebase.firestore.FieldValue.arrayUnion(db.collection(deskCategory.toLowerCase()).doc(id))
                })
        }


        else if (deskCategory === 'Flashcards') {

            db.collection(deskCategory.toLowerCase())
                .doc(id)
                .set({
                    id: id,
                    class: selectedClass,
                    title: title,
                    section: !sectionNumber ? null : sectionType,
                    sectionNumber: sectionNumber ? +sectionNumber : null,
                    cards: cards,
                    description: description,
                    isPublic: isPublic,
                    ownerUID: auth.currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    views: [],
                    comments: [],
                    likes: []

                })
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .update({
                    flashcards: firebase.firestore.FieldValue.arrayUnion(db.collection(deskCategory.toLowerCase()).doc(id))
                })
        }

        else if (deskCategory === 'Readings') {
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .update({
                    readings: firebase.firestore.FieldValue.arrayUnion(db.collection(deskCategory.toLowerCase()).doc(id))
                })
        }


        else if (deskCategory === 'Other') {
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .update({
                    other: firebase.firestore.FieldValue.arrayUnion(db.collection(deskCategory.toLowerCase()).doc(id))
                })
        }


        navigation.goBack()

    }
    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>

            <OptionsModal
                options={['Take Picture', 'Choose From Library']}
                onOptionPress={[onTakePicturePress, onLibraryPress]}
                showModal={showImageOptionsModal}
                onCancelPress={() => { setShowImageOptionsModal(false) }}
            />

            <Header
                navigation={navigation}
                title={'New ' + deskCategory}
                direction={'vertical'}
                shadow

            />
            <ScrollView
                style={{ padding: 20 }}
                ref={(ref) => setScrollRef(ref)}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionHeaderText}>{'Topic Information'}</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}>

                    {classes.map((item, index) =>
                        <FilterTag
                            key={index.toString()}
                            onPress={() => {
                                if (item === selectedClass)
                                    setSelectedClass(null)
                                else
                                    setSelectedClass(item)
                            }}
                            item={item}
                            isSelected={item === selectedClass}
                            collection={'classes'}
                        />

                    )}

                </ScrollView>


                <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, marginVertical: 20 }}>
                    <Image source={assets.pencil} style={{ width: 30, height: 30, tintColor: 'lightgray', margin: 10 }} />

                    <TextInput
                        style={styles.titleInput}
                        placeholder='Title'
                        value={title}
                        onChangeText={setTitle}
                        placeholderTextColor={'darkgray'}
                        selectionColor={Colors.light.primary}
                        returnKeyType='done'
                        returnKeyLabel='done'
                    />

                </View>


                <View style={{ flexDirection: 'row' }}>
                    <Dropdown
                        data={data}
                        value={sectionType}
                        onChange={item => { setSectionType(item.value) }}
                        placeholderStyle={{ color: 'darkgray', fontFamily: 'Kanit' }}
                        style={{ width: '30%', borderRadius: 15, backgroundColor: '#272727', padding: 10 }}
                        maxHeight={400}
                        containerStyle={{ backgroundColor: '#272727', borderWidth: 0, borderRadius: 15 }}
                        labelField="label"
                        valueField="value"
                        itemContainerStyle={{ backgroundColor: '#272727', borderRadius: 15 }}
                        itemTextStyle={{ fontFamily: 'Kanit', color: 'darkgray' }}
                        selectedTextStyle={{ color: 'darkgray' }}
                        fontFamily='Kanit'
                        showsVerticalScrollIndicator={false}
                        autoScroll={false}
                        placeholder={sectionType}
                    >

                    </Dropdown>
                    <TextInput
                        style={styles.sectionNumberInput}
                        placeholder={sectionType + ' number'}
                        value={sectionNumber}
                        onChangeText={setSectionNumber}
                        placeholderTextColor={'darkgray'}
                        selectionColor={Colors.light.primary}
                        keyboardType='decimal-pad'
                        returnKeyType='done'
                        returnKeyLabel='done'
                    />
                </View>





                {deskCategory !== 'Flashcards' ? <Text style={styles.sectionHeaderText}>Images</Text> :

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                        <Text style={styles.sectionHeaderText}>{'Card ' + (cards.length + 1)}</Text>
                        {cardFront.trim() && cardBack.trim() &&

                            <Text
                                onPress={() => {
                                    cards.push({ cardFront: cardFront, cardBack: cardBack });
                                    setCardBack('');
                                    setCardFront('');
                                }}
                                style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, fontSize: 18, marginVertical: 20 }}>{'Save Card'}</Text>}
                    </View>

                }
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    pagingEnabled
                    bounces={false}
                    onContentSizeChange={() => imageScrollRef.scrollToEnd()}
                    ref={(ref) => setImageScrollRef(ref)}
                >

                    {deskCategory !== 'Flashcards' ?
                        <View style={{ flexDirection: 'row' }}>


                            {images.map((image, index) =>


                                <View
                                    key={index.toString()}
                                    style={{ marginRight: 20, width: 150, height: 150, backgroundColor: 'gray', borderRadius: 15, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                                    <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} />
                                    <TouchableOpacity
                                        onPress={() => setImages(images.filter(item => item != image))}
                                        style={{ position: 'absolute', backgroundColor: '#00000060', borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                                    </TouchableOpacity>
                                </View>
                            )}

                            <TouchableOpacity
                                onPress={() => setShowImageOptionsModal(true)}
                                style={{ width: 150, height: 150, backgroundColor: 'gray', borderRadius: 15, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>

                                <Image source={assets.add} style={{ width: 40, height: 40, tintColor: 'darkgray' }} />


                            </TouchableOpacity>

                        </View>


                        :
                        <View style={{ flexDirection: 'row' }}>



                            {cards.map((card, index) =>
                                <View
                                    key={index.toString()}
                                    style={{ flexDirection: 'row' }}>

                                    <View style={[styles.cardContainerLeft, { marginRight: 10 }]}>
                                        <TouchableOpacity
                                            onPress={() => setCards(cards.filter(item => item != card))}
                                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#00000060', borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 24 }}>{card.cardFront}</Text>

                                    </View>
                                    <View style={[styles.cardContainerLeft, { marginRight: 10 }]}>
                                        <TouchableOpacity
                                            onPress={() => setCards(cards.filter(item => item != card))}
                                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#00000060', borderRadius: 50, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={assets.trash} style={{ width: 15, height: 15, tintColor: 'white' }} />
                                        </TouchableOpacity>
                                        <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 24 }}>{card.cardBack}</Text>

                                    </View>

                                </View>
                            )}




                            <View style={styles.cardContainerLeft}>

                                <TextInput
                                    style={{ flexDirection: 'row', fontFamily: 'Kanit', fontSize: 24, color: 'white' }}
                                    placeholder={"Term"}
                                    value={cardFront.trimStart()}
                                    onChangeText={setCardFront}
                                    placeholderTextColor={'darkgray'}
                                    selectionColor={Colors.light.primary}
                                    multiline
                                    returnKeyType='done'
                                    returnKeyLabel='done'
                                    allowFontScaling
                                />


                            </View>

                            <View style={styles.cardContainerRight}>

                                <TextInput
                                    style={{ flexDirection: 'row', fontFamily: 'Kanit', fontSize: 16, color: 'white', padding: 5 }}
                                    placeholder={"Definition"}
                                    value={cardBack.trimStart()}
                                    multiline
                                    numberOfLines={10}
                                    onChangeText={setCardBack}
                                    placeholderTextColor={'darkgray'}
                                    selectionColor={Colors.light.primary}

                                    returnKeyType='done'
                                    returnKeyLabel='done'

                                />


                            </View>
                        </View>
                    }
                </ScrollView>



                <Text style={styles.sectionHeaderText}>{'Description'}</Text>
                <TextInput
                    multiline
                    numberOfLines={50}
                    style={styles.descriptionInput}
                    placeholder={'Add a Description'}
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor={'darkgray'}
                    selectionColor={Colors.light.primary}

                    onFocus={() => scrollRef.scrollToEnd()}



                />



                <View style={{ marginBottom: 100 }}>
                    <Text style={styles.sectionHeaderText}>{'Privacy'}</Text>

                    <View style={{ borderRadius: 15, padding: 15, backgroundColor: '#272727' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 17, width: '50%' }}>Public</Text>
                            <ToggleSwitch onToggle={() => setIsPublic(!isPublic)} isOn={isPublic} onColor={Colors.light.primary} size={'large'} offColor={'#646464'} />
                        </View>

                        <Text style={{ fontFamily: 'Kanit', color: 'lightgray' }}>{isPublic ? 'Anyone can see these ' + deskCategory : 'Only you can see these ' + deskCategory} </Text>
                    </View>

                    <Text style={{ fontFamily: 'Kanit', color: 'gray', margin: 10 }}>{'Manage who can see your ' + deskCategory + ' by making them Public or Private'}</Text>
                </View>


            </ScrollView>
            <View style={{ padding: 20 }}>
                <Button
                    background={Colors.light.accent}
                    tint={'white'}
                    title={'Post'}
                    width={'100%'}
                    condition={(images.length > 0 || cards.length > 0) && title}
                    onPress={onPostPress}

                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainerRight: {
        marginLeft: 20,
        width: 180,
        height: 150,
        backgroundColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row'
    },

    cardContainerLeft: {
        width: 180,
        height: 150,
        backgroundColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row'
    },

    sectionNumberInput: {
        marginLeft: 20,
        fontFamily: 'Kanit',
        fontSize: 16,
        color: 'white',
        backgroundColor: '#272727',
        borderRadius: 15,
        paddingHorizontal: 30,
        height: 60
    },

    descriptionInput: {
        fontFamily: 'Kanit',
        fontSize: 16,
        color: 'white',
        backgroundColor: '#272727',
        borderRadius: 15,
        padding: 10,
        height: 100
    },

    titleInput: {
        flexDirection: 'row',
        width: '100%',
        fontFamily: 'Kanit',
        fontSize: 28,
        color: 'white'
    },

    sectionHeaderText: {
        fontFamily: 'KanitMedium',
        color: 'darkgray',
        fontSize: 18,
        marginVertical: 20
    }




})

export default NewDeskItem