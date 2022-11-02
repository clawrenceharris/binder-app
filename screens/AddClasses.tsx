import { View, Text, SafeAreaView, Image, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { assets } from '../constants'
import { SHADOWS, SIZES } from '../constants/Theme'
import BackButton from '../components/BackButton'
import Classes from '../constants/data/Classes'
import ClassListItem from '../components/ClassListItem'
const AddClasses = ({ navigation }) => {
    const [classes, setClasses] = useState(Classes)
    const [search, setSearch] = useState('')
    const [selectedSchools, setSelectedSchools] = useState(null)

    const handleSearch = (value) => {
        setSearch(value)
        if (!value.length) {
            return setClasses(Classes)
        }
        const filteredData = Classes.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()))

        if (filteredData.length) {
            setClasses(filteredData)
        }
        else {
            setClasses(filteredData)
        }

    }
    return (
        <View style={{ backgroundColor: '#333', flex: 1 }}>

            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', height: SIZES.header + 50, padding: 5, backgroundColor: '#333', ...SHADOWS.light, shadowColor: '#272727', zIndex: 1 }}>
                <View style={{ position: 'absolute', left: 0, top: 40 }}>
                    <BackButton navigation={navigation} margin={10} color={'white'} direction={'vertical'} />

                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 30 }}>


                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, marginBottom: 10 }}>Add Classes</Text>

                    <TextInput
                        placeholder='Search for Classes...'
                        style={{ color: '#f4f4f4', width: '200%', backgroundColor: '#454545', borderRadius: 50, padding: 10, alignSelf: 'center' }}
                        onChangeText={handleSearch}
                        placeholderTextColor='#5F5F5F'

                    />

                </View>
            </View>
            <View style={{ marginHorizontal: 20 }}>




                <FlatList
                    style={{ height: '100%' }}
                    data={classes}
                    renderItem={({ item }) => <ClassListItem Class={item} />}
                    showsVerticalScrollIndicator={false}

                />
            </View>



        </View>
    )
}

export default AddClasses