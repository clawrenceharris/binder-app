import { View, Text, FlatList, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Classes from '../constants/data/Classes'
import ClassChatListItem from '../components/ClassChatListItem'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Colors, assets } from '../constants'
import { SHADOWS } from '../constants/Theme'
import { Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import useColorScheme from '../hooks/useColorScheme'
import { UserProfileCircle } from '../components'
import Header from '../components/Header'
import { db } from '../Firebase/firebase'



export default function Feed() {

    const colorScheme = useColorScheme()
    const [classData, setClassData] = useState(null)
    const [users, setUsers] = useState(null)
    const navigation = useNavigation()
    // useEffect(() => {
    //     const subscriber = db.collection('classes').doc(route.params.Class.id).get().then(doc => {
    //         setClassData(doc.data())

    //         const array = []
    //         doc.data().users.forEach(user => {
    //             console.log(user.id)
    //             db.collection('users').doc(user.id).onSnapshot(doc => { setUsers(doc.data()); console.log(doc.data()) })
    //         })

    //     })
    //     console.log(users)
    //     return () => {
    //     }
    // }, [])


    const headerRight = () => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Chats')}>
            <Image source={assets.send} style={{ width: 28, height: 28, tintColor: 'white' }} />

        </TouchableWithoutFeedback>
    )

    return (
        <View style={{ backgroundColor: '#333', height: '100%' }}>
            <Header
                title={classData?.name}
                navigation={useNavigation()}
                shadow
                headerRight={headerRight()}
            />
            {/* {users?.length > 1 ? <ScrollView showsVerticalScrollIndicator={false}>

                <Text style={styles.subHeaderTitle}>Classmates</Text>

                <FlatList
                    data={[]}
                    horizontal
                    renderItem={({ item }) => <UserProfileCircle user={item} size={50} showStoryBoder showName bold={false} showStudyBuddy margin={25} flexDirection='column' />}
                    keyExtractor={(item) => item.id}

                    showsHorizontalScrollIndicator={false}



                />

                <Text style={styles.subHeaderTitle}>Messages</Text>

                <FlatList
                    data={[]}
                    renderItem={({ item }) => <ClassChatListItem Class={Classes[route.params.class.id]} />}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}

                    style={{ paddingHorizontal: 10 }}


                />


            </ScrollView>

                : <Text style={{ fontFamily: 'Kanit', color: 'gray', alignSelf: 'center', marginTop: '50%', fontSize: 20 }}>It's just you in here.🙈</Text>
            }

            <TouchableOpacity style={[styles.addChatBtn, { ...SHADOWS.dark }]}>
                <Image source={assets.new_chat} style={{ tintColor: 'white', width: 35, height: 35 }} />
            </TouchableOpacity> */}

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

