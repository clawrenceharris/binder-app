import { View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { auth, db, getData, getUsers } from '../Firebase/firebase'
import UserListItem from '../components/UserListItem'
import FilterTag from '../components/FilterTag'
import SelectionButton from '../components/SelectionButton'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { getDisplayName } from '../utils'
import Button from '../components/Button'
import firebase from 'firebase/compat'
import { faker } from '@faker-js/faker'
import { useRoute } from '@react-navigation/native'
import useColorScheme from '../hooks/useColorScheme'
const NewChat = ({ navigation }) => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    const [school, setSchool] = useState(null)
    const [classes, setClasses] = useState([])
    const [filters, setFilters] = useState([])
    const selectionLimit = 10
    const [selectedUsers, setSelectedUsers] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isGroup, setIsGroup] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const colorScheme = useColorScheme()
    const [reload, setReload] = useState(false)
    console.log("Length", users.length)

    useEffect(() => {
        const array = []
        db.collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(doc => {
                setCurrentUser(doc.data())
                setClasses(doc.data().classes)
                if (doc.data().school) {
                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .get()
                        .then(doc => {

                            doc.data().users.forEach(user => {
                                db.collection('users')
                                    .doc(user.id)
                                    .get()
                                    .then(doc => {
                                        if (doc.id != auth.currentUser.uid) {
                                            array.push(doc)
                                            setResults(array)
                                            setUsers(array)

                                        }
                                    })

                            })
                            setSchool(doc.data())

                            if (!filters.length && school) {
                                setFilters([school?.id])

                            }
                        })
                }
            })





    }, [reload])

    const getDataToShow = () => results.length ? results : users




    const handleNewChat = () => {

        const id = selectedUsers.map(user => user.data().uid).join("-")
        const defaultGroupName = selectedUsers.map(item => item.data().displayName).join(", ")

        const users = []
        selectedUsers.forEach(user => users.push(user.id))

        db.collection('chatrooms').doc(id).get().then(doc => {
            if (!doc.exists) {

                db.collection('chatrooms').doc(id).set({
                    id: id,
                    type: selectedUsers.length > 1 ? 'group' : 'private',
                    name: selectedUsers.length > 1 ?
                        groupName ? groupName : "Group: " + defaultGroupName //if group name is defined then set that as the name otherwise, use the default group name
                        : selectedUsers[0].data().displayName,



                    users: users,
                    chats: []


                }, { merge: true })



                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({ chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(id)) })

            }


        })

        navigation.goBack()
        navigation.navigate('Chatroom', { chatroomID: id })

    }

    const handleSearch = (value) => {
        let filteredData = []
        setSearch(value)
        if (!value.length) {
            return setResults(users)
        }
        filteredData = users.filter(item => item.data().displayName.toLowerCase().includes(value.toLowerCase()))

        if (filteredData.length) {
            console.log("There is data")
            setResults(filteredData)
        }

        else {
            setResults([])
        }




    }
    const isSelected = (item) => {
        return selectedUsers.includes(item)
    }

    const onFilterSelect = (item) => {
        if (filters.includes(item?.id)) {
            const deselect = filters.filter(selected => selected != item?.id) // create a new data array that does not include the selected item
            return setFilters(deselect)
        }

        setFilters([...filters, item?.id]); // add item to selected items array

    }

    const isFilterSelected = (item) => {

        return filters.includes(item?.id)
    }
    const onSelect = (item) => {
        if (selectedUsers.includes(item)) //if we select an item that is already selected
        {
            const deselect = selectedUsers.filter(selected => selected != item) // create a new data array that does not include the selected item
            return setSelectedUsers(deselect)
        }

        if (selectedUsers.length === selectionLimit && selectionLimit != 1) {
            return
        }

        if (selectedUsers.length === selectionLimit && selectionLimit == 1) {
            return setSelectedUsers([item]); // add item to selected items array

        }

        setSelectedUsers([...selectedUsers, item]); // add item to selected items array

    }
    const reloadUseEffect = () => {
        // setReload(true)
    }
    return (

        <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>

            <Header
                title='New Chat'
                direction='vertical'
                isModal
                textStyle={{ color: Colors[colorScheme].tint }}
                style={{ backgroundColor: Colors[colorScheme].background }}

            />


            <View style={{ paddingHorizontal: 20 }}>



                {!selectedUsers.length ?

                    <TextInput
                        style={[styles.input, , { height: 45 }]}
                        placeholder={"To: "}
                        selectionColor={Colors.light.primary}
                        onChangeText={handleSearch}
                        value={search}
                        placeholderTextColor={'gray'}
                        autoFocus
                        returnKeyType='search'
                        onFocus={reloadUseEffect}
                    />


                    :

                    <View style={[styles.input, { height: 45 }]}>
                        <Text style={{ fontFamily: 'KanitSemiBold', color: 'gray', marginLeft: 10, fontSize: 18 }}>To: </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', position: 'absolute', top: 7, left: 50, width: '85%' }}>

                            {selectedUsers.map((item, index) =>
                                <View
                                    key={index.toString()}
                                    style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 50, backgroundColor: '#00000070', marginLeft: 10 }}>
                                    <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{item.data().displayName}</Text>
                                </View>

                            )}

                        </ScrollView>

                    </View>




                }




                {selectedUsers.length < 2 && !isGroup ?
                    <TouchableWithoutFeedback onPress={() => { setIsGroup(true) }}>

                        <View style={{ width: '100%', height: 60, backgroundColor: Colors[colorScheme].primary, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>

                            <Text style={{ color: 'white', fontFamily: 'KanitSemiBold', fontSize: 16 }}>{"New Group Chat"}</Text>
                            <Image source={assets.group} style={{ width: 28, height: 28, tintColor: 'white' }} />

                        </View>
                    </TouchableWithoutFeedback>



                    :

                    <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, justifyContent: 'center' }}>
                        <Image source={assets.pencil} style={{ width: 30, height: 30, tintColor: 'lightgray', margin: 10 }} />

                        <TextInput
                            style={{ flexDirection: 'row', width: '50%', height: 60, fontFamily: 'Kanit', fontSize: 28, color: 'white' }}
                            placeholder='Group Name'
                            value={groupName}
                            onChangeText={setGroupName}
                            placeholderTextColor={'darkgray'}
                            selectionColor={Colors.light.primary}

                        />

                    </View>


                }


                <ScrollView
                    style={{ marginVertical: 20 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>

                    <FilterTag


                        item={school}
                        collection={'schools'}
                        isSelected
                        onPress={() => { }}

                    />


                    {classes.map((item, index) =>
                        <FilterTag
                            key={index.toString()}
                            onPress={() => onFilterSelect(item)}
                            item={item}
                            isSelected={isFilterSelected(item)}
                            collection={'classes'}
                        />

                    )}

                </ScrollView>

                {results
                    .filter(item => item?.id !== auth.currentUser.uid).length === 0 && search &&
                    <Text style={{ color: 'gray', fontFamily: 'Kanit', alignSelf: 'center', textAlign: 'center', margin: 20 }}>{"No users were found by this name.\n\n If you can't find who you're looking for, you can invite them to Binder using their phone number!"}</Text>

                }


                <ScrollView>

                    {results

                        .map((item, index) =>

                            <TouchableWithoutFeedback onPress={() => onSelect(item)}>

                                <View

                                    style={{ paddingHorizontal: 10, marginBottom: 10 }}
                                    key={index.toString()}>

                                    <UserListItem
                                        user={item}
                                        onPress={() => onSelect(item)}
                                        isSelected={isSelected(item)}

                                    />




                                </View>
                            </TouchableWithoutFeedback>

                        )}
                    {/* {users
                        .filter(item => item.uid !== auth.currentUser.uid).length === 0 && !search &&
                        <Text style={{ color: 'gray', fontFamily: 'Kanit', alignSelf: 'center', textAlign: 'center' }}>{"No one else has joined " + school?.name + " yet. \nTry inviting people!"}</Text>

                    } */}


                </ScrollView>
            </View>
            {users.filter(item => item?.id !== auth.currentUser.uid).length > 0 ?
                <View style={{ marginVertical: 50 }}>

                    <Button
                        background={Colors.light.primary}
                        tint='white'
                        onPress={handleNewChat}
                        style={{ width: '50%' }}
                        title={selectedUsers.length <= 1 && !isGroup ? 'Chat' : 'Group Chat'}

                        disabled={selectedUsers.length === 0}

                    />
                </View>
                :
                <View style={{ marginVertical: 50 }}>

                    <Button
                        background={'white'}
                        tint='black'
                        onPress={() => { }}
                        style={{ width: '50%' }}
                        title={'Invite Friends'}

                        disabled={false}

                    />
                </View>

            }

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#00000030',
        borderRadius: 25,
        width: '100%',
        marginVertical: 20,
        padding: 10,
        fontFamily: 'KanitSemiBold'
    },

})
export default NewChat