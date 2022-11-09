import { FlatList, LogBox, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { Colors, assets } from '../constants'
import SchoolListItemToJoin from '../components/SchoolListItemToJoin'
import ClassListItemToJoin from '../components/ClassListItemToJoin'
import UserListItemToAdd from '../components/UserListItemToAdd'
import { auth, db } from '../Firebase/firebase'
import { SHADOWS } from '../constants/Theme'
import { getDisplayName } from '../utils'
import { UserProfileCircle } from '../components'
import UserListItem from '../components/UserListItem'
import SelectionButton from '../components/SelectionButton'
import { faker } from '@faker-js/faker'
const SearchSelectUsers = ({ navigation }) => {
    LogBox.ignoreLogs([
        'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.'
    ])




    const route = useRoute()
    const [search, setSearch] = useState('')
    const [selectedData, setSelectedData] = useState([])
    const [_data, setData] = useState(null)

    const { data, selectionLimit, update, title } = route.params
    const [results, setResults] = useState(data)

    const [users, setUsers] = useState(null)
    const [currentIndex, setIndex] = useState(0)



    useEffect(() => {

        db.collection('users').doc(auth.currentUser.uid).get().then(doc => {
            db.collection('schools').doc(doc.data().school.id).get().then(doc => {
                const array = []
                let index = 0
                setUsers(doc.data().users)

                users.forEach((user) => {

                    db.collection('users').doc(user.id).get().then(doc => {
                        array.push({
                            firstName: doc.data().firstName,
                            lastName: doc.data().lastName,
                            photoURL: doc.data().photoURL,
                            uid: doc.data().uid,
                        })
                    })

                })
                setResults(array) //set the users to search for to be all users in the current user's school

            })
        })
    }, [])


    const handleSearch = (value) => {
        setSearch(value)

        if (!value.length) {
            return setResults(_data)
        }

        const filteredData = results.filter(item =>
            item?.firstName.toLowerCase().includes(value.toLowerCase()
                || item?.lastName.toLowerCase().includes(value.toLowerCase())
            ))


        if (filteredData.length) {
            setResults(filteredData)
        }

        else {
            setResults(filteredData)
        }

    }
    const isSelected = (item) => { selectedData.includes(item?.uid); console.log(selectedData.includes(item?.uid)) }


    const onSelect = (item) => {
        if (selectedData.includes(item?.uid)) //if we select an item that is already selected
        {
            const deselect = selectedData.filter(selected => selected != item?.uid) // create a new data array that does not include the selected item
            return setSelectedData(deselect)
        }

        if (selectedData.length === selectionLimit && selectionLimit != 1) {
            return
        }

        if (selectedData.length === selectionLimit && selectionLimit == 1) {
            return setSelectedData([item?.uid]); // add item to selected items array

        }

        setSelectedData([...selectedData, item?.uid]); // add item to selected items array

    }


    const headerRight = () => (
        <Text
            onPress={selectedData.length > 0 ? () => {
                if (selectionLimit == 1) {
                    update(selectedData[0])
                }

                else {
                    update(selectedData);
                }
                navigation.goBack()
            } : () => { }
            }
            style={{ fontFamily: 'KanitMedium', color: selectedData.length > 0 ? Colors.light.primary : 'gray', margin: 10, fontSize: 16 }}>Done
        </Text>
    )

    const headerLeft = () => (
        <Text
            onPress={() => navigation.goBack()}
            style={{ fontFamily: 'KanitMedium', color: 'white', margin: 10, fontSize: 16 }}>Cancel
        </Text>
    )


    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>


            <Header
                title={title}
                navigation={navigation}
                direction={'vertical'}
                headerRight={headerRight()}
                headerLeft={headerLeft()}
                shadow
            />



            <View style={{ paddingHorizontal: 20 }}>
                <ScrollView>
                    <TextInput
                        style={styles.input}
                        placeholder="Find Students"
                        selectionColor={Colors.light.primary}
                        onChangeText={handleSearch}
                        value={search}
                        placeholderTextColor={'#6F6F6F'}
                    />


                    {/* {results.length > 0 ?
                        <FlatList
                            data={results}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator
                            keyExtractor={() => faker.datatype.uuid()}
                            renderItem={({ item }) =>
                                <View >
                                    <UserListItem
                                        user={item}
                                        isTop={item.index === 0}
                                        isBottom={item.index === results.length - 1} />
                                    <View style={{ position: 'absolute', right: 20, top: 20 }}>
                                        <TouchableOpacity
                                            onPress={() => onSelect(item)}
                                        >

                                            <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, borderColor: 'lightgray', borderWidth: 1, borderRadius: 100, backgroundColor: isSelected(item) ? Colors.light.primary : 'transparent' }} />
                                        </TouchableOpacity>


                                    </View>

                                </View>
                            }
                        />
                        :

                        <Text>No Results</Text>
                    } */}


                    {results.length > 0 ?
                        results.map((item, index) =>

                            <View key={index}>
                                <UserListItem
                                    user={item}
                                    isTop={item.index === 0}
                                    isBottom={item.index === results.length - 1}
                                />
                                <View style={{ position: 'absolute', right: 20, top: 20 }}>
                                    <TouchableOpacity
                                        onPress={() => onSelect(item)}
                                    >

                                        <View style={{ padding: 5, justifyContent: 'center', alignItems: 'center', width: 30, height: 30, borderColor: 'lightgray', borderWidth: 1, borderRadius: 100, backgroundColor: isSelected(item) ? Colors.light.primary : 'transparent' }} />
                                    </TouchableOpacity>


                                </View>

                            </View>
                        )





                        :

                        <Text>No Results</Text>
                    }
                </ScrollView>
            </View>


        </View>
    )

}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        color: 'white',
        backgroundColor: '#454545',
        borderRadius: 25,
        padding: 10,
        width: '100%',
        marginVertical: 20
    },

})

export default SearchSelectUsers