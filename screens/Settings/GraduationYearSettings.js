import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { SIZES } from '../../constants/Theme'
import BackButton from '../../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Header from '../../components/Header'
import SelectionButton from '../../components/SelectionButton'
import ToggleButton from '../../components/ToggleButton'
import { Colors } from '../../constants'
import Button from '../../components/Button'
import { auth, updateCollection } from '../../Firebase/firebase'

const GraduationYearSettings = () => {
    const navigation = useNavigation()
    const year = new Date().getFullYear();
    const years = [year, year + 1, year + 2, , year + 3, , year + 4, , year + 5, , year + 6, "I Don't Know"]
    const [selectedYear, setSelectedYear] = useState(null)




    const onSelect = (year) => {

        if (selectedYear === year) {
            return setSelectedYear(null)
        }
        setSelectedYear(year);
    }



    const isSelected = (year) => {
        return year === selectedYear
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                title={'Graduation Year'}
                navigation={navigation}

            />
            <View style={[styles.mainContainer, { padding: 30 }]} >

                <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, textAlign: 'center' }}>When do you expect graduate?</Text>
                <Text style={styles.description}>{descriptions.school}</Text>



                <ScrollView style={{ padding: 10, height: '60%' }}
                    pagingEnabled
                    showsVerticalScrollIndicator={false}
                >

                    {years.map((year, index) =>
                        <TouchableOpacity
                            onPress={() => { onSelect(year) }}
                            key={index}
                            activeOpacity={0.8}
                            style={{ flexDirection: 'row', marginBottom: 22, padding: 30, width: '100%', backgroundColor: '#272727', borderRadius: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontFamily: "KanitMedium", fontSize: 16 }}>{year}</Text>
                            <SelectionButton
                                onSelect={() => { onSelect(year) }}
                                isSelected={isSelected(year)}
                                acitveOpacity={1}

                            />

                        </TouchableOpacity>
                    )}
                </ScrollView>

                <Button
                    background={Colors.light.primary}
                    tint={'white'}
                    title='Save'
                    width={'100%'}
                    onPress={() => { updateCollection('users', auth.currentUser.uid, { gradYear: selectedYear }); navigation.goBack(); }}
                    condition={selectedYear != null}
                />
            </View>









        </View >
    )
}

export default GraduationYearSettings