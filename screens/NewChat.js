import { View, Text, ScrollView, TextInput, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { auth, db, getUsers } from '../Firebase/firebase'
import UserListItem from '../components/UserListItem'
import FilterTag from '../components/FilterTag'
import SelectionButton from '../components/SelectionButton'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import { getDisplayName } from '../utils'
import Button from '../components/Button'
import firebase from 'firebase/compat'
import { faker } from '@faker-js/faker'
import { useRoute } from '@react-navigation/native'
const NewChat = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const [chatroomExists, setChatroomExists] = useState(false)
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
    // const getFilteredData = () => {
    //     let filteredData = []
    //     filters.forEach(filter => {


    //         if (filter === 'study buddies') {

    //             filteredData = (results.filter(item => {
    //                 getStudyBuddy(item?.uid, setIsStudyBuddy)
    //                 return isStudyBuddy
    //             }

    //             ))
    //         }
    //         else {
    //             filteredData = (results.filter(item => {
    //                 getIsSameClass(item?.uid, filter, setIsSameClass)
    //                 return isSameClass

    //             }))
    //         }
    //     })
    //     console.log(filteredData)
    //     if (filteredData.length > 0)
    //         return filteredData
    //     else {
    //         return results
    //     }

    // }
    // const getIsSameClass = (userId, classId, setIsSameClass) => {

    //     db.collection('users')
    //         .doc(userId)
    //         .get()
    //         .then(doc => doc.data()?.classes.forEach(item => {
    //             setIsSameClass(item.id === classId)

    //         }))

    // }

    // const getStudyBuddy = (uid, setIsStudyBuddy) => {
    //     db.collection('users')
    //         .doc(auth.currentUser.uid)
    //         .get()
    //         .then(doc => setIsStudyBuddy(doc.data().studyBuddies.includes(db.collection('users').doc(uid))))

    // }

    useEffect(() => {
        // const array = []
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
                            setUsers(doc.data()?.users)
                            if (!results.length)
                                setResults(doc.data()?.users)
                            setSchool(doc.data())
                            if (!filters.length && school) {
                                setFilters([school?.id])

                            }
                        })
                }
            })




    }, [school])


    const handleNewChat = () => {
        const id = selectedUsers.map(user => user.uid).join("")
        const defaultGroupName = selectedUsers.map(item => getDisplayName(item.firstName, item.lastName)).join(", ")

        db.collection('chatrooms').doc(id).get().then(doc => {
            if (doc.exists) {
                navigation.goBack()
                navigation.navigate('Chatroom', { chatroom: id })
            }
            else {
                db.collection('chatrooms').doc(id).set({
                    id: id,
                    type: selectedUsers.length > 1 ? 'group' : 'private',
                    name: selectedUsers.length < 2 ? '' // if we only selected one user to chat with
                        : groupName ? groupName : "Group: " + defaultGroupName, //else if group name is defined then set that as the name otherwise, use the default group name


                    users: [...selectedUsers, currentUser],
                    messages: []

                })
                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({ chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(id)) })


            }

        })



    }

    const handleSearch = (value) => {
        setSearch(value)
        if (!value.length) {
            return setResults(users)
        }

        const filteredData = users.filter(item =>
            getDisplayName(item?.firstName, item?.lastName).toLowerCase().includes(value.toLowerCase()

            ))


        if (filteredData.length) {
            setResults(filteredData)
        }

        else {
            setResults(filteredData)
        }

    }
    const isSelected = (item) => { return selectedUsers.includes(item) }

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

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                title='New Chat'
                direction='vertical'
                isModal

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
                    />


                    :

                    <View style={[styles.input, { height: 45 }]}>
                        <Text style={{ fontFamily: 'KanitSemiBold', color: 'gray', marginLeft: 10, fontSize: 18 }}>To: </Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ flexDirection: 'row', position: 'absolute', top: 7, left: 50, width: '85%' }}>

                            {selectedUsers.map((item, index) =>
                                <View style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 50, backgroundColor: '#272727', marginLeft: 10 }}>
                                    <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{getDisplayName(item.firstName, item.lastName)}</Text>
                                </View>

                            )}

                        </ScrollView>

                    </View>




                }




                {selectedUsers.length < 2 && !isGroup ?
                    <TouchableWithoutFeedback onPress={() => { setIsGroup(true) }}>

                        <View style={{ width: '100%', height: 60, backgroundColor: '#272727', borderWidth: 2, borderColor: Colors.light.primary, borderRadius: 15, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' }}>

                            <Text style={{ color: 'white', fontFamily: 'KanitSemiBold', fontSize: 16 }}>New Group Chat</Text>
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
                <ScrollView>

                    {results.filter(item => item.uid != auth.currentUser.uid).map((item, index) =>
                        <TouchableWithoutFeedback onPress={() => onSelect(item)}>

                            <View
                                style={{ paddingHorizontal: 10 }}
                                key={index.toString()}>
                                <UserListItem
                                    user={item}
                                    isTop={index === 0}
                                    isBottom={index === results.length - 2}
                                />

                                <View style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <SelectionButton
                                        onSelect={() => onSelect(item)}
                                        isSelected={isSelected(item)}
                                    />
                                </View>

                            </View>
                        </TouchableWithoutFeedback>

                    )}


                </ScrollView>
            </View>
            <View style={{ marginVertical: 50 }}>

                <Button
                    background={Colors.light.primary}
                    tint='white'
                    onPress={handleNewChat}
                    width='50%'
                    title={selectedUsers.length <= 1 && !isGroup ? 'Chat' : 'Group Chat'}

                    condition={selectedUsers.length > 0}

                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        color: 'white',
        backgroundColor: '#454545',
        borderRadius: 25,
        width: '100%',
        marginVertical: 20,
        padding: 10,
        fontFamily: 'KanitSemiBold'
    },

})
export default NewChat