import { View, Text, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import useColorScheme from '../hooks/useColorScheme';
import { assets, Colors } from '../constants/index';
import ClassListItem from '../components/ClassListItem';
import Classes from '../constants/data/Classes';
import ModalComponent from '../components/Modal';
import { SHADOWS } from '../constants/Theme';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../Firebase/firebase';
import { UserProfileCircle } from '../components';
import Header from '../components/Header';

export default function ClassesScreen({ currentUser }) {
    const colorScheme = useColorScheme();
    const navigation = useNavigation()
    const [open, setOpen] = useState(false)
    const modal = () => (
        <View>
            <Text>Modal</Text>
        </View>
    )

    const headerRight = () => (
        <UserProfileCircle user={currentUser} size={40} showName={false} showStoryBoder bold={false} showStudyBuddy={false} showActive />

    )
    const headerLeft = () => (
        <Image source={assets.create} style={{ width: 30, height: 30, tintColor: Colors[colorScheme].background }} />

    )

    return (

        <View style={{ backgroundColor: '#333333', flex: 1 }} >
            <Header
                title='Classes'
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                shadow
                navigation={navigation}

            />

            <TouchableOpacity

                style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 50,
                    backgroundColor: Colors.light.primary,
                    ...SHADOWS.light,
                    shadowColor: '#272727',
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 1
                }}
                onPress={() => navigation.navigate('AddClasses')}
            >
                <Image source={assets.add_class} style={{ width: 35, height: 35, tintColor: 'white' }} />
            </TouchableOpacity>
            <View >

                <FlatList style={{ height: '80%', paddingHorizontal: 10 }}
                    data={Classes}
                    renderItem={({ item }) => <ClassListItem Class={item} chatRoom={item.chatRooms[0]} />}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                />

            </View>

            {Classes.length <= 0 && <View>
                <Text>No Active Classes</Text>

            </View>}
        </View>


    )
}