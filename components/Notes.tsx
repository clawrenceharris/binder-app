import { View, Text, FlatList, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import Notes from '../constants/data/Notes'
import NotePost from './NotePost'
import { Colors } from '../constants'
const NotesComponent = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

    const onViewableItemsChanged = useRef((item) => {
        const index = item.viewableItems[0].index;
        setCurrentSlideIndex(index)

    })
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    return (

        <View>
            <View style={{ padding: 10 }}>

                <View style={{ alignItems: 'flex-end' }}>

                    <View style={{
                        backgroundColor: 'lightgray', width: 40, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                    }}>
                        < Text style={{ fontFamily: 'Kanit' }}>{currentSlideIndex + 1} / {Notes[0].images.length}</Text>

                    </View>
                </View>

            </View >
            <FlatList
                data={Notes[0].images}
                renderItem={({ item }) => <NotePost item={item.image} />}

                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
            />


            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {Notes[0].images.map((item, index) => {
                    return (<View key={item.id} style={{ marginTop: 10, width: 6, height: 6, borderRadius: 50, backgroundColor: currentSlideIndex === index ? Colors.light.primary : 'lightgray', marginRight: 10 }} />)
                })}
            </View>

        </View >


    )
}

export default NotesComponent