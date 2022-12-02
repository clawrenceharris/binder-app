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
const AddClasses = ({ navigation }) => {
    const route = useRoute()

    const [search, setSearch] = useState('')
    const [selectedData, setSelectedData] = useState([])
    const colorScheme = useColorScheme()
    const { school, update } = route.params
    const [classes, setClasses] = useState([])
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState([])
    useEffect(() => {
        const array = []

        school?.classes?.forEach(item => {
            db.collection('classes')
                .doc(item.id)
                .get()
                .then(doc => {
                    array.push(doc.data())
                    setClasses(array)
                    setResults(array)
                }).catch((error) => console.log(error))
        })

    }, [])



    const headerRight = () => (
        <Button
            background='white'
            tint={Colors.light.primary}
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
            style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].background, margin: 10, fontSize: 16 }}>
            {"Cancel"}
        </Text>
    )
    function handleSearch(value) {

        if (!value.length) {
            return setResults(classes)
        }

        const filteredData = classes.filter((item) =>
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
                title={"Add Classes"}
                navigation={navigation}
                direction={'vertical'}
                headerRight={headerRight()}
                headerLeft={headerLeft()}
                style={{ backgroundColor: Colors.light.accent, height: 150, zIndex: 0 }}
            />

            <View style={{ backgroundColor: Colors.light.accent, height: 100, paddingHorizontal: 20 }}>

                <Input
                    onChangeText={(value) => { setSearch(value); handleSearch(value) }}
                    value={search}
                    placeholder={'Search'}
                />

            </View>


            <ScrollView
                style={{ padding: 20, marginTop: -30, borderRadius: 25, backgroundColor: Colors[colorScheme].background, height: '100%' }}>
                <Text style={{ fontFamily: 'Kanit', color: 'gray', margin: 20, alignSelf: 'center' }}>{"Add up to 10 classes"}</Text>
                {results?.length > 0 ?
                    <FlatList
                        scrollEnabled={false}
                        data={results}
                        renderItem={({ item }) =>

                            <ClassListItem
                                type={'selectable'}
                                Class={item}
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


export default AddClasses