import { View, Text, FlatList, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import NotePost from './NotePost'
import { Colors } from '../constants'
import FlippableFlashcard from './FlippableFlashcard'
import { faker } from '@faker-js/faker'
const ScrollableFlashcards = ({ flashcards }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [reset, setReset] = useState(false)

    const onViewableItemsChanged = useRef((item) => {
        const index = item.viewableItems[0].index;
        setCurrentSlideIndex(index)


    })
    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    })
    return (

        <View style={{ padding: 20, alignItems: 'center' }}>
            <View>

                <View style={{ alignItems: 'flex-end' }}>

                    <View style={{
                        backgroundColor: 'lightgray', width: 40, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center'
                    }}>
                        < Text style={{ fontFamily: 'Kanit' }}>{currentSlideIndex + 1} / {flashcards?.length}</Text>

                    </View>
                </View>

            </View >
            <FlatList
                data={flashcards}
                renderItem={({ item }) =>

                    <FlippableFlashcard card={item} reset={reset} margin={50} />


                }

                keyExtractor={(item) => faker.datatype.uuid()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged.current}
                viewabilityConfig={viewabilityConfig.current}
            />


            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                {flashcards?.map((item, index) =>
                    <View
                        key={index.toString()}
                        style={{ marginTop: 10, width: 6, height: 6, borderRadius: 50, backgroundColor: currentSlideIndex === index ? Colors.light.primary : 'lightgray', marginRight: 10 }} />
                )}
            </View>

        </View >


    )
}

export default ScrollableFlashcards