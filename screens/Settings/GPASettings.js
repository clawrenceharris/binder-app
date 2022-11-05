import { View, Text, Image, TextInput, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import BackButton from '../../components/BackButton'
import { assets, Colors } from '../../constants'
import { SHADOWS, SIZES } from '../../constants/Theme'
import { useNavigation } from '@react-navigation/native'
import { descriptions, styles } from '.'
import Header from '../../components/Header'
import SelectionButton from '../../components/SelectionButton'
import { auth, updateCollection } from '../../Firebase/firebase'
import Button from '../../components/Button'

const GPASetttings = ({ route }) => {
    const navigation = useNavigation()
    const gpas = ['< 1.7', '1.7 - 2.3', '2.7 - 3.3', '3.3 - 4.0', '> 4.0']
    const [selectedGpa, setGpa] = useState(null)

    const onSelect = (gpa) => {
        if (selectedGpa === gpa) {
            return setGpa(null)
        }
        setGpa(gpa);
    }


    const isSelected = (gpa) => {
        return gpa === selectedGpa
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                title={'GPA'}
                navigation={navigation}

            />

            <View style={[styles.mainContainer]}>
                <View>
                    <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 20, textAlign: 'center' }}>What was your unweighted GPA on your last transcript?</Text>
                    <View style={{ width: 20, height: 20, borderColor: 'white', borderWidth: 2, borderRadius: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 55, bottom: 5 }}>

                        <Image source={assets.info} style={{ width: 10, height: 10, tintColor: 'white' }} />

                    </View>
                </View>

                <Text style={styles.description}>{descriptions.gpa}</Text>



                <ScrollView style={{ marginVertical: 20 }}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {gpas.map((gpa, index) =>

                        <TouchableOpacity
                            onPress={() => { onSelect(gpa) }}
                            key={index}
                            style={{ padding: 20, flexDirection: 'row', marginLeft: 20, width: 150, height: 100, backgroundColor: '#272727', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontFamily: "KanitMedium", fontSize: 16 }}>{gpa}</Text>
                            <SelectionButton
                                onSelect={() => { onSelect(gpa) }}
                                isSelected={isSelected(gpa)}
                                acitveOpacity={1}
                            />

                        </TouchableOpacity>

                    )}
                </ScrollView>

                <Button
                    background={Colors.light.primary}
                    tint={'white'}
                    title='Save'
                    onPress={() => { updateCollection('users', auth.currentUser.uid, { gpa: selectedGpa }); navigation.goBack(); }}
                    condition={selectedGpa != null}
                />

            </View>


        </View>
    )
}

export default GPASetttings