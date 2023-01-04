import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import useColorScheme from '../hooks/useColorScheme'
const NewDeskItem = ({ navigation }) => {
    const [sectionNumber, setSectionNumber] = useState('')
    const route = useRoute()
    const [isPublic, setIsPublic] = useState(true)
    const [scrollRef, setScrollRef] = useState(null)
    const [classes, setClasses] = useState([])
    const [selectedClass, setSelectedClass] = useState(null)
    const [description, setDescription] = useState('')
    const colorScheme = useColorScheme()

    const { deskType, cards, files, title } = route.params
    const [sectionType, setSectionType] = useState('Chapter')




    const data = [
        { label: 'Chapter', value: 'Chapter' },
        { label: 'Section', value: 'Section' },
        { label: 'Unit', value: 'Unit' },



    ]

    useEffect(() => {
        db.collection('users')
            .doc(auth.currentUser.uid)
            .collection('classes')
            .get()
            .then(snapshot => {
                setClasses(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()

                })))
            })

    }, [])


    const onPostPress = () => {
        const id = faker.datatype.uuid()

        //flashcards have slighlty different data settings than the other desk items so we set its data separatley
        if (deskType !== 'Flashcards') {
            db.collection('desks')
                .doc(auth.currentUser.uid)
                .collection(deskType.toLowerCase())
                .add({
                    id: id,
                    class: selectedClass,
                    title: title,
                    section: !sectionNumber ? null : sectionType,
                    sectionNumber: sectionNumber ? +sectionNumber : null,
                    files: files,
                    description: description,
                    isPublic: isPublic,
                    ownerUID: auth.currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    views: [],
                    comments: [],
                    likes: []

                })
        }



        else if (deskType === 'Flashcards') {

            db.collection('desks')
                .doc(auth.currentUser.uid)
                .collection(deskType.toLowerCase())
                .add({
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






            navigation.goBack()
            navigation.goBack()

        }
    }


    return (
        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>


            <Header
                navigation={navigation}
                title={'New ' + deskType}
                direction={'horizontal'}
                style={{ backgroundColor: Colors.primary, zIndex: 0, height: 170 }}

            />
            <ScrollView
                style={{ padding: 20, marginTop: -40, borderRadius: 25, backgroundColor: Colors[colorScheme].background }}
                ref={(ref) => setScrollRef(ref)}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionHeaderText}>{'Topic Information'}</Text>


                <ScrollView
                    style={{ marginBottom: 30 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>

                    {classes.map(({ id, data }) =>
                        <FilterTag
                            key={id}
                            onPress={() => {
                                if (data === selectedClass)
                                    setSelectedClass(null)
                                else
                                    setSelectedClass(data)
                            }}
                            data={data.name}
                            isSelected={data === selectedClass}
                        />

                    )}

                </ScrollView>


                <View style={{ flexDirection: 'row' }}>
                    <Dropdown
                        data={data}
                        value={sectionType}
                        onChange={item => { setSectionType(item.value) }}
                        placeholderStyle={{ color: 'darkgray', fontFamily: 'Kanit' }}
                        style={{ width: '30%', borderRadius: 15, backgroundColor: '#00000010', padding: 10 }}
                        maxHeight={400}
                        containerStyle={{ backgroundColor: colorScheme === 'light' ? '#E5E5E5' : 'black', borderWidth: 0, borderRadius: 15 }}
                        labelField="label"
                        valueField="value"
                        itemContainerStyle={{ backgroundColor: colorScheme === 'light' ? '#E5E5E5' : 'black', borderRadius: 15 }}
                        itemTextStyle={{ color: Colors[colorScheme].tint }}
                        selectedTextStyle={{ color: Colors[colorScheme].tint }}
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
                        selectionColor={Colors.accent}
                        keyboardType='decimal-pad'
                        returnKeyType='done'
                        returnKeyLabel='done'
                    />
                </View>


                <Text style={styles.sectionHeaderText}>{'Description'}</Text>
                <TextInput
                    multiline
                    numberOfLines={50}
                    style={[styles.descriptionInput, { color: Colors[colorScheme].tint }]}
                    placeholder={'Add a Description'}
                    value={description}
                    onChangeText={setDescription}
                    placeholderTextColor={'darkgray'}
                    selectionColor={Colors.accent}

                    onFocus={() => scrollRef.scrollToEnd()}



                />



                <View style={{ marginBottom: 150 }}>
                    <Text style={styles.sectionHeaderText}>{'Privacy'}</Text>

                    <View style={{ borderRadius: 15, padding: 15, backgroundColor: '#00000010' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, fontSize: 17, width: '50%' }}>{"Public"}</Text>
                            <ToggleSwitch onToggle={() => setIsPublic(!isPublic)} isOn={isPublic} onColor={Colors.accent} size={'large'} offColor={'#646464'} />
                        </View>

                        <Text style={{ fontFamily: 'Kanit', color: 'gray' }}>{isPublic ? 'Anyone can see these ' + deskType : 'Only you can see these ' + deskType + "."} </Text>
                    </View>

                    <Text style={{ fontFamily: 'Kanit', color: 'gray', margin: 10 }}>{'Manage who can see your ' + deskType + ' by making them Public or Private.'}</Text>
                </View>


            </ScrollView >



            <Button
                title={'Done'}
                disabled={(!files.length && !cards.length) || !title}
                onPress={onPostPress}
                style={{ position: 'absolute', bottom: 30, width: '60%' }}

            />
        </View >
    )
}

const styles = StyleSheet.create({
    cardContainerRight: {
        marginLeft: 10,
        width: 180,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    cardContainerLeft: {
        width: 180,
        height: 150,
        backgroundColor: '#00000010',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexDirection: 'row',

    },

    imageContainer: {
        marginRight: 20,
        width: 150,
        height: 150,
        backgroundColor: 'gray',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    sectionNumberInput: {
        marginLeft: 20,
        fontFamily: 'Kanit',
        fontSize: 16,
        backgroundColor: '#00000010',
        borderRadius: 15,
        paddingHorizontal: 30,
        height: 60
    },

    descriptionInput: {
        fontFamily: 'Kanit',
        fontSize: 16,
        backgroundColor: '#00000010',
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
        color: 'gray',
        fontSize: 18,
        marginVertical: 20
    },

    cornerButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#00000060',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardInput: {
        flexDirection: 'row',
        fontFamily: 'Kanit',
        fontSize: 16,
        padding: 5
    }




})

export default NewDeskItem