import { FlatList, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import Header from '../components/Header'
import { Colors, assets } from '../constants'
import Button from '../components/Button'
import Input from '../components/Input'
import { db } from '../Firebase/firebase'
import { isSelected, onSelect } from '../utils'
import ClassListItem from '../components/ClassListItem'
import SchoolListItem from '../components/SchoolListItem'
const AddSchool = ({ navigation }) => {
    const route = useRoute()

    const [search, setSearch] = useState('')
    const [selectedData, setSelectedData] = useState([])
    const colorScheme = useColorScheme()
    const { update } = route.params
    const [schools, setSchools] = useState([])
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])

    useEffect(() => {
        const array = []
        db.collection('schools')
            .get()
            .then(query => {
                query.forEach(doc => {
                    array.push(doc.data())
                    setSchools(array)
                    setResults(array)
                })
            })



    }, [])



    const headerRight = () => (
        <Button
            background='white'
            tint={Colors.accent}
            title={'Done'}
            style={{ minHeight: 10, paddingVertical: 5 }}
            disabled={selectedData.length === 0}
            onPress={() => {
                update(selectedData);
                navigation.goBack();

            }
            }

        />


    )

    const headerLeft = () => (
        <Text
            onPress={() => navigation.goBack()}
            style={{ fontFamily: 'KanitMedium', color: 'white', margin: 10, fontSize: 16 }}>
            {"Cancel"}
        </Text>
    )
    function handleSearch(value) {

        if (!value.length) {
            return setResults(schools)
        }

        const filteredData = schools.filter((item) =>
            item?.name?.toLowerCase().includes(value.toLowerCase())
        )

        if (filteredData.length) {
            setResults(filteredData)
        }

        else {
            setResults([])
        }
    }



    return (
        <View style={{ flex: 1 }}>

            <Header
                title={"Add a School"}
                navigation={navigation}
                direction={'vertical'}
                headerRight={headerRight()}
                headerLeft={headerLeft()}
                style={{ backgroundColor: Colors.primary, height: 150, zIndex: 0 }}
            />

            <View style={{ backgroundColor: Colors.primary, height: 100, paddingHorizontal: 20 }}>

                <Input
                    onChangeText={(value) => { setSearch(value); handleSearch(value) }}
                    value={search}
                    placeholder={'Search'}
                />

            </View>


            <ScrollView
                style={{ padding: 20, marginTop: -30, borderRadius: 25, backgroundColor: Colors[colorScheme].background, height: '100%' }}>
                {results?.length > 0 ?
                    <FlatList
                        scrollEnabled={false}
                        data={results}
                        renderItem={({ item }) =>

                            <SchoolListItem

                                school={item}
                                isSelected={isSelected(selectedData, item)}
                                onSelect={() => onSelect(selectedData, setSelectedData, item, 10)}
                            />
                        }
                        keyExtractor={(item) => item.id}
                    />

                    :

                    <></>
                }
            </ScrollView>


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


export default AddSchool