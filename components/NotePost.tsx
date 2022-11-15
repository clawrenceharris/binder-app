import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'




const NotePost = ({ item }) => {
    const { width } = useWindowDimensions();
    const postDim = width - 20

    return (
        <View style={{ padding: 10, height: '70%' }}>
            <Image source={{ uri: item }} style={{ resizeMode: 'cover', width: postDim, height: postDim }} />
        </View>
    )
}

export default NotePost