import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import { auth, db } from '../Firebase/firebase'
import DeskItemPreview from '../components/DeskItemPreview'
import { assets } from '../constants'

const BookmarkedItems = ({ navigation }) => {
    const route = useRoute()
    const deskCategory = route.params.deskCategory
    const deskItems = route.params.deskItems
    const [bookmarkedItems, setBookmarkedItems] = useState([])

    const getItemLayout = (data, index) => {
        const productHeight = 80;
        return {
            length: productHeight,
            offset: productHeight * index,
            index,
        };
    };

    useEffect(() => {
        const array = []
        let subscriber = null
        deskItems.forEach((item) => {

            subscriber = db.collection(deskCategory.toLowerCase())
                .doc(item.id)
                .onSnapshot(doc => {

                    if (doc.data()?.bookmarked === true) {
                        console.log("TRUE")
                        array.push(doc.data())
                        setBookmarkedItems(array)
                    }


                })


        })




    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#333' }}>
            <Header
                navigation={navigation}
                title={'Bookmarked'}
                direction={'vertical'}
                icon={assets.bookmark}
                shadow
            />
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50, height: '100%' }}>

                <FlatList
                    data={bookmarkedItems}

                    renderItem={({ item }) =>
                        <DeskItemPreview

                            item={item}
                            margin={10}
                            deskCategory={deskCategory}
                            onMorePress={() => { }}
                            onLongPress={() => { }}


                        />}
                />
            </View>

        </View>
    )
}

export default BookmarkedItems