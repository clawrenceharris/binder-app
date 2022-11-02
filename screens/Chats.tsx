import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Classes from '../constants/data/Classes'
import ClassChatListItem from '../components/ClassChatListItem'
import { useRoute } from '@react-navigation/native'
import { Colors, assets } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { UserProfileCircle } from '../components'
import Users from '../constants/data/Users'

export default function Chats({ route }) {
    const colorScheme = useColorScheme()
    return (
        <View style={{ backgroundColor: Colors[colorScheme].background, height: '100%' }}>



            <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.subHeaderTitle}>Classmates</Text>

                <FlatList
                    data={Users}
                    horizontal
                    renderItem={({ item }) => <UserProfileCircle user={item} size={50} showStoryBoder showName bold={false} showStudyBuddy margin={25} flexDirection='column' />}
                    keyExtractor={(item) => item.id}

                    showsHorizontalScrollIndicator={false}



                />

                <Text style={styles.subHeaderTitle}>Messages</Text>

                <FlatList
                    data={Classes[route.params.class.id].chatRooms}
                    renderItem={({ item }) => <ClassChatListItem Class={Classes[route.params.class.id]} chatRoom={item} />}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}

                    style={{ paddingHorizontal: 10 }}


                />


            </ScrollView>

            <TouchableOpacity style={[styles.addChatBtn, { ...SHADOWS[colorScheme] }]}>
                <Image source={assets.new_chat} style={{ tintColor: 'white', width: 35, height: 35 }} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    addChatBtn: {
        bottom: 20,
        right: 20,
        backgroundColor: Colors.light.primary,
        width: 70,
        height: 70,
        position: 'absolute',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    subHeaderTitle: {
        fontFamily: 'KanitMedium',
        fontSize: 16,
        marginLeft: 10
    }
})

