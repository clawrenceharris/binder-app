import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../components/Header'
import { assets, Colors } from '../constants'
import { ProfileButton } from '../components'
import { auth, db } from '../Firebase/firebase'
import firebase from 'firebase/compat'
import OptionsModal from '../components/OptionsModal'
import { Dropdown } from 'react-native-element-dropdown'
import { haptics } from '../utils'
import ConfirmationModal from '../components/ConfirmationModal'
import DeskItemPreview from '../components/DeskItemPreview'
import MoreButton from '../components/MoreButton'
import useColorScheme from '../hooks/useColorScheme'
import { ActivityBadge } from '../components/ProfileBadges'
import FilterTag from '../components/FilterTag'
import Button from '../components/Button'
import { SHADOWS } from '../constants/Theme'
import ListItemButton from '../components/ListItemButton'

const Desk = ({ navigation }) => {

    const [showDeskItemModal, setShowDeskItemModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const colorScheme = useColorScheme()



    const headerLeft = () => (
        <ProfileButton
            defaultImage={assets.person}
            onPress={function (): void {
                navigation.openDrawer()
            }}

            badgeContainerStyle={{ backgroundColor: Colors.primary, top: '55%', left: '65%' }}
            badge={ActivityBadge()}

            showsName={true}


        />

    )

    const headerRight = () => (
        <MoreButton onPress={() => setShowModal(true)} />

    )

    return (
        <View style={{ flex: 1 }}>
            <Header
                title={'Your Desk'}
                headerLeft={headerLeft()}
                headerRight={headerRight()}
                navigation={navigation}
                style={{ backgroundColor: Colors.primary, height: 170, zIndex: 0 }}

            />
            <View style={{ padding: 10, justifyContent: 'center', backgroundColor: Colors[colorScheme].background, height: '80%', borderRadius: 15, marginTop: -30 }}>


                <View style={{ ...SHADOWS[colorScheme] }}>
                    <ListItemButton
                        title={"Notes"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Notes' }) }}
                        isTop
                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.notes}

                    />
                    <ListItemButton
                        title={"Flashcards"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Flashcards' }) }}

                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.flashcards}
                        imageStyle={{ transform: [{ rotateZ: '90deg' }] }}

                    />
                    <ListItemButton
                        title={"Study Guides"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Study Guides' }) }}

                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.guide}

                    />

                    <ListItemButton
                        title={"Readings"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Readings' }) }}

                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.reading}

                    />

                    <ListItemButton
                        title={"Graded Work"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Grade Work' }) }}

                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.grade}

                    />

                    <ListItemButton
                        title={"Other"}
                        onPress={() => { navigation.navigate('DeskItems', { deskType: 'Other' }) }}
                        isBottom
                        style={{ backgroundColor: colorScheme === 'light' ? Colors.dark.tint : Colors.light.tint }}
                        icon={assets.other}

                    />
                </View>
            </View>

        </View>





    )

}
const styles = StyleSheet.create({
    icon: {
        width: 22,
        height: 22,

    },
    listItemTopContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        boderBottomWidth: 1,
        borderBottomeColor: 'lightgray',
        justifyContent: 'space-between',
        padding: 10
    },
    listItemBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 10
    },
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        boderBottomWidth: 1,
        borderBottomeColor: 'lightgray',

        padding: 10
    },
    listItemText: {
        fontFamily: 'Kanit',
        fontSize: 16,
        marginLeft: 10
    }
})
export default Desk