import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../Firebase/firebase'
import { Colors } from '../constants'

const FilterTag = ({ item, onPress, isSelected, collection }) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const subscriber = db.collection(collection)
            .doc(item?.id)
            .onSnapshot(doc => {
                setData(doc.data())
            })

        return () => subscriber()


    }, [item])

    return (
        <TouchableWithoutFeedback onPress={() => { onPress(); }}>
            <View style={{
                padding: 10,
                borderColor: isSelected ? Colors.light.accent : 'gray',
                borderWidth: 1,
                margin: 10,
                borderRadius: 50,
                backgroundColor: isSelected ? Colors.light.accent : 'transparent'
            }}>
                <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{data?.name}</Text>

            </View>
        </TouchableWithoutFeedback>

    )
}

export default FilterTag