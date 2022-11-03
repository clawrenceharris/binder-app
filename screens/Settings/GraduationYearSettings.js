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
import { auth, updateUserCollection } from '../../Firebase/firebase'

const GraduationYearSettings = () => {
    const navigation = useNavigation()
    const year = new Date().getFullYear();
    const years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 'Other']
    const [selectedYear, setSelectedYear] = useState(null)
    const onViewableItemsChanged = useRef((item) => {
        const index = item.viewableItems[0].index;
        //setCurrentSlideIndex(index)

    })
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    const isYearSelected = (year) => {
        console.log(selectedYear)
        return year == selectedYear
    }

    const onSelect = (year) => {
        console.log(year, " == ", selectedYear)

        if (selectedYear === year) {
            return setSelectedYear(null)
        }
        setSelectedYear(year);
    }



    const isSelected = (year) => {
        console.log(year, " == ", selectedYear)
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
                    onViewableItemsChanged={onViewableItemsChanged.current}
                    viewabilityConfig={viewabilityConfig.current}
                    showsVerticalScrollIndicator={false}
                >

                    {years.map((year, index) =>
                        <View key={index} style={{ flexDirection: 'row', marginBottom: 22, padding: 30, width: '100%', backgroundColor: '#272727', borderRadius: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: 'white', fontFamily: "KanitMedium", fontSize: 16 }}>{year}</Text>
                            <SelectionButton
                                onSelect={() => { onSelect(year) }}
                                isSelected={isSelected(year)}
                            />

                        </View>
                    )}
                </ScrollView>

                <Button
                    background={Colors.light.primary}
                    tint={'white'}
                    title='Save'
                    onPress={() => { updateUserCollection(auth.currentUser.uid, { gradYear: selectedYear }); navigation.goBack(); }}
                    condition={selectedYear != null}
                />
            </View>









        </View >
    )
}

export default GraduationYearSettings