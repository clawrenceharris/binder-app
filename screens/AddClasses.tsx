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


        db.collection('schools')
            .doc(school.id)
            .collection('classes')
            .get()
            .then(query => {
                setClasses(
                    query.docs.map((doc) => (
                        {
                            data: doc.data()
                        }
                    )))
                setResults(
                    query.docs.map((doc) => (
                        {
                            data: doc.data()
                        }
                    )))
            })







    }, [])





    function handleSearch(value) {

        if (!value.length) {
            return setResults(classes)
        }

        const filteredData = classes.filter((item) =>
            item.data.name.toLowerCase().includes(value.toLowerCase())
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
            <Button

                title={'Done'}
                style={{ position: 'absolute', bottom: 30, width: '50%', zIndex: 2 }}
                disabled={selectedData.length === 0}
                onPress={() => {
                    update(selectedData);
                    navigation.goBack();

                }
                }

            />

            <Header
                title={"Add Classes"}
                navigation={navigation}
                direction={'vertical'}

                style={{ backgroundColor: Colors.primary, height: 150, zIndex: 0 }}
            />



            <ScrollView
                style={{ padding: 20, marginTop: -30, borderRadius: 25, backgroundColor: Colors[colorScheme].background, height: '100%' }}>

                <Input
                    onChangeText={(value) => { setSearch(value); handleSearch(value) }}
                    value={search}
                    placeholder={'Search'}
                />



                <Text style={{ fontFamily: 'Kanit', color: 'gray', margin: 20, alignSelf: 'center' }}>{"Add up to 10 classes"}</Text>
                {results?.length > 0 ?
                    <FlatList
                        scrollEnabled={false}
                        data={results}
                        renderItem={({ item }) =>

                            <ClassListItem
                                type={'selectable'}
                                Class={item.data}
                                isSelected={isSelected(selectedData, item.data)}
                                onSelect={() => onSelect(selectedData, setSelectedData, item.data, 10)}
                            />
                        }
                        keyExtractor={(item) => item?.id}
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