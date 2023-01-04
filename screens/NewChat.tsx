import { View, Text, ScrollView, TextInput, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { auth, db, getData } from '../Firebase/firebase'
import UserListItem from '../components/UserListItem'
import FilterTag from '../components/FilterTag'
import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet'
import Button from '../components/Button'
import firebase from 'firebase/compat'
import useColorScheme from '../hooks/useColorScheme'
import Input from '../components/Input'
const NewChat = ({ navigation }) => {

    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [results, setResults] = useState([])
    const [school, setSchool] = useState(null)
    const [classes, setClasses] = useState([])
    const [filters, setFilters] = useState([])
    const selectionLimit = 1
    const [selectedUsers, setSelectedUsers] = useState([])
    const [groupName, setGroupName] = useState('')
    const [isGroup, setIsGroup] = useState(false)
    const [selectedClass, setSelectedClass] = useState(null)
    const colorScheme = useColorScheme()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const users = []
        const classes = []
        setLoading(true)
        db.collection('users')
            .doc(auth.currentUser.uid)
            .get()
            .then(doc => {
                if (doc.data().school) {

                    //get the school data
                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .get()
                        .then(doc => setSchool(doc.data()))

                    //get the classes 
                    doc.data().classes.forEach((item) =>
                        db.collection('schools')
                            .doc(doc.data().school.id)
                            .collection('classes')
                            .doc(item.id)
                            .get()
                            .then(doc => {
                                classes.push(doc.data())
                                setClasses(classes)
                            }))

                    //get the users in the user's school



                    db.collection('schools')
                        .doc(doc.data().school.id)
                        .collection('users')
                        .get().then(snapshot => {

                            snapshot.docs.forEach((doc) => {
                                {
                                    if (doc.data().user.id != auth.currentUser.uid) {
                                        db.collection('users')
                                            .doc(doc.data().user.id)
                                            .get()
                                            .then(doc => {

                                                users.push(doc.data());
                                                setUsers(users)
                                                setResults(users)
                                            })
                                    }
                                }
                            })
                            setLoading(false)


                        })

                }
            })





    }, [])

    const filterUsers = (selected) => {
        if (!selected)
            console.log(results.filter(item =>
                item.classes.includes(db.collection('classes').doc(selectedClass?.id))
            ))
        else {
            setResults(users)
        }
    }




    const handleNewChat = () => {

        const id = selectedUsers.map(user => user.uid).join("-")
        const defaultGroupName = selectedUsers.map(item => item.displayName).join(", ")

        const users = []
        selectedUsers.forEach(user => users.push(user.id))

        db.collection('chatrooms').doc(id).get().then(doc => {
            if (!doc.exists) {

                db.collection('chatrooms').doc(id).set({
                    id: id,
                    type: selectedUsers.length > 1 ? 'group' : 'private',
                    users: selectedUsers.map((user) => (db.collection('users').doc(user.uid))),
                    name: groupName || defaultGroupName
                }, { merge: true })



                db.collection('users')
                    .doc(auth.currentUser.uid)
                    .update({ chatrooms: firebase.firestore.FieldValue.arrayUnion(db.collection('chatrooms').doc(id)) })

            }


        })

        navigation.goBack()
        navigation.navigate('Chatroom', {
            id: id,
            name: selectedUsers.length > 1 && groupName || defaultGroupName

        })

    }

    const handleSearch = (value) => {
        let filteredData = []
        setSearch(value)
        if (!value.length) {
            return setResults(users)
        }
        filteredData = users.filter(item =>
            item.displayName.toLowerCase().includes(value.trim().toLowerCase())
        )

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
        if (filters.includes(item)) {
            const deselect = filters.filter(selected => selected != item) // create a new data array that does not include the selected item
            filterUsers(isFilterSelected(item))
            return setFilters(deselect)
        }

        setFilters([...filters, item]); // add item to selected items array
        filterUsers(isFilterSelected(item))

    }

    const isFilterSelected = (item) => {

        return filters.includes(item)
    }
    const onSelect = (item) => {
        if (selectedUsers.includes(item)) //if we select an item that is already selected
        {
            const deselect = selectedUsers.filter(selected => selected != item) // create a new data array that does not include the selected item
            return setSelectedUsers(deselect)
        }


        return setSelectedUsers([item]); // add item to selected items array
    }

    if (loading) {
        return (
            <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>

                <Header
                    title='New Chat'
                    direction='vertical'
                    isModal
                    textStyle={{ color: Colors[colorScheme].tint }}
                    style={{ backgroundColor: Colors[colorScheme].background }}

                />
                <View style={{ paddingHorizontal: 10 }}>




                    <Input

                        placeholder={"To: "}
                        selectionColor={Colors.accent}
                        onChangeText={handleSearch}
                        value={search}
                        returnKeyType='search'

                    />

                </View>
                <ScrollView
                    style={{ marginVertical: 20, marginLeft: 10 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>

                    {school && <FilterTag

                        data={school.name}
                        collection={db.collection('schools')}
                        isSelected
                        onPress={() => { }}
                    />}


                    {classes.map((item, index) =>
                        <FilterTag
                            key={index.toString()}
                            onPress={() => { }}
                            data={item.name}
                            item={item}
                            isSelected={isFilterSelected(item)}
                            collection={db.collection('users').doc(auth.currentUser.uid)}
                        />

                    )}

                </ScrollView>
            </View>)

    }
    else {
        return (

            <View style={{ flex: 1, backgroundColor: Colors[colorScheme].background }}>

                <Header
                    title='New Chat'
                    direction='vertical'
                    isModal
                    textStyle={{ color: Colors[colorScheme].tint }}
                    style={{ backgroundColor: Colors[colorScheme].background }}

                />




                <View style={{ paddingHorizontal: 10 }}>


                    {!selectedUsers.length ?

                        <Input

                            placeholder={"To: "}
                            selectionColor={Colors.accent}
                            onChangeText={handleSearch}
                            value={search}
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
                                    <View
                                        key={index.toString()}
                                        style={{ paddingVertical: 5, paddingHorizontal: 15, borderRadius: 50, backgroundColor: '#00000030', marginLeft: 10 }}>
                                        <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{item.displayName}</Text>
                                    </View>

                                )}

                            </ScrollView>

                        </View>




                    }


                </View>




                {selectedUsers.length > 1 && <View style={{ flexDirection: 'row', alignItems: 'center', height: 60, justifyContent: 'center' }}>
                    <Image source={assets.pencil} style={{ width: 30, height: 30, tintColor: 'lightgray', margin: 10 }} />

                    <TextInput
                        style={{ flexDirection: 'row', width: '50%', height: 60, fontFamily: 'Kanit', fontSize: 28, color: Colors[colorScheme].tint }}
                        placeholder='Group Name'
                        value={groupName}
                        onChangeText={setGroupName}
                        placeholderTextColor={'darkgray'}
                        selectionColor={Colors.accent}

                    />

                </View>}





                <ScrollView
                    style={{ marginVertical: 20, marginLeft: 10 }}
                    horizontal
                    showsHorizontalScrollIndicator={false}>

                    {school && <FilterTag

                        data={school.name}
                        collection={db.collection('schools')}
                        isSelected
                        onPress={() => { }}
                    />}


                    {classes.map((item, index) =>
                        <FilterTag
                            key={index.toString()}
                            onPress={() => { setSelectedClass(item); onFilterSelect(item); }}
                            data={item.name}
                            item={item}
                            isSelected={isFilterSelected(item)}
                            collection={db.collection('users').doc(auth.currentUser.uid)}
                        />

                    )}

                </ScrollView>

                {results.filter(item => item.uid !== auth.currentUser.uid).length === 0 &&
                    <Text style={{ color: 'gray', fontFamily: 'Kanit', alignSelf: 'center', textAlign: 'center', margin: 20 }}>{"No users were found."}</Text>

                }


                <FlatList
                    style={{ height: '60%' }}
                    data={results}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback onPress={() => onSelect(item)}>

                            <View style={{ paddingHorizontal: 10, marginBottom: 30 }}>

                                <UserListItem
                                    user={item}
                                    onPress={() => onSelect(item)}
                                    isSelected={isSelected(item)}

                                />
                            </View>
                        </TouchableWithoutFeedback>
                    )}

                />


                {/* {users
                        .filter(item => item.uid !== auth.currentUser.uid).length === 0 && !search &&
                        <Text style={{ color: 'gray', fontFamily: 'Kanit', alignSelf: 'center', textAlign: 'center' }}>{"No one else has joined " + school?.name + " yet. \nTry inviting people!"}</Text>

                    } */}







                <Button
                    background={Colors.accent}
                    tint='white'
                    onPress={handleNewChat}
                    style={{ width: '50%', position: 'absolute', bottom: 30, zIndex: 2 }}
                    title={selectedUsers.length <= 1 && !isGroup ? 'Chat' : 'Group Chat'}

                    disabled={selectedUsers.length === 0}

                />








            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        fontSize: 20,
        padding: 10,
        fontFamily: 'Kanit',
        color: 'white',
        backgroundColor: '#00000010',
        borderRadius: 15
    },

})
export default NewChat