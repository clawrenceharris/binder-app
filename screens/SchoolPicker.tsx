import { View, Text, TextInput, Image, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { assets, Colors } from '../constants'
import Schools from '../constants/data/Schools'
import ClassListItem from '../components/ClassListItem'
import SchoolListItem from '../components/SchoolListItem'
import { useRoute } from '@react-navigation/native'
import SchoolListItemToJoin from '../components/SchoolListItemToJoin'
import BackButton from '../components/BackButton'
import { SHADOWS, SIZES } from '../constants/Theme'
import Button from '../components/Button'


const SELECTION_LIMIT = 1
const SchoolPicker = ({ navigation }) => {
    const [schools, setSchools] = useState(Schools)
    const [search, setSearch] = useState('')
    const [selectedSchool, setSelectedSchool] = useState(null)
    const [newSchool, setNewSchool] = useState(null)
    const [showMessage, setShowMessage] = useState(false)

    const route = useRoute()
    const handleSearch = (value) => {
        setSearch(value)
        setNewSchool({
            name: value,
            type: undefined,
            logo: undefined,
            location: undefined,
            users: [],
            active: [],
            classes: []
        })
        if (!value.length) {
            return setSchools(Schools)
        }
        const filteredData = Schools.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()))

        if (filteredData.length) {
            setSchools(filteredData)
        }
        else {
            setSchools(filteredData)
        }

    }
    const isSelected = (item) => selectedSchool === item


    const onSelect = (item) => {


        if (selectedSchool === item) {
            return setSelectedSchool(null)
        }
        setSelectedSchool(item);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: SIZES.header, padding: 5, backgroundColor: '#333' }}>
                <View style={{ position: 'absolute', left: 0, paddingTop: 30 }}>
                    <Text
                        onPress={() => navigation.goBack()}
                        style={{ fontFamily: 'KanitMedium', color: 'white', margin: 10, fontSize: 16 }}>Cancel
                    </Text>
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', paddingTop: 30 }}>


                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginLeft: 10 }}>Add Schools</Text>

                </View>

                <View style={{ position: 'absolute', right: 0, paddingTop: 30 }}>
                    <Text
                        onPress={() => { if (selectedSchool) route.params.update(selectedSchool); navigation.goBack() }}
                        style={{ fontFamily: 'KanitMedium', color: Colors.light.primary, margin: 10, fontSize: 16 }}>Done
                    </Text>
                </View>


            </View>

            <View style={{ padding: 20, alignItems: 'center' }}>
                <TextInput
                    style={{ fontSize: 16, color: 'white', backgroundColor: '#454545', borderRadius: 25, width: '100%', padding: 10 }}
                    placeholder="Search for Schools..."
                    selectionColor={Colors.light.primary}
                    onChangeText={handleSearch}
                    value={search}
                    placeholderTextColor={'#6F6F6F'}


                />

            </View>
            <ScrollView>

                {search && <SchoolListItemToJoin
                    isSelected={isSelected(newSchool)}

                    onSelect={() => onSelect(newSchool)}
                    school={newSchool}
                />}

                {schools.length > 0 ? <FlatList
                    scrollEnabled={false}
                    data={schools}
                    renderItem={({ item }) =>
                        <SchoolListItemToJoin
                            isSelected={isSelected(item)}
                            onSelect={() => onSelect(item)}
                            school={item}

                        />}
                    keyExtractor={(item) => item.id}
                />

                    :
                    <></>
                }
            </ScrollView>


        </View>
    )


}

export default SchoolPicker
