import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { assets, Colors } from '../constants'
import useColorScheme from '../hooks/useColorScheme'
import Header from '../components/Header'
import { useRoute } from '@react-navigation/native'
import OptionsModal from '../components/OptionsModal'
import { db } from '../Firebase/firebase'
import ScrollableImages from '../components/ScrollableImages'
import FlippableFlashcard from '../components/FlippableFlashcard'
import ScrollableFlashcards from '../components/ScrollableFlashcards'
const DeskItem = ({ navigation }) => {

    const route = useRoute()
    const deskItem = route.params.deskItem
    const deskCategory = route.params.deskCategory
    const [showModal, setShowModal] = useState(false)

    const [currentIndex, setCurrentIndex] = useState(0)
    const [reset, setReset] = useState(false)

    const headerRight = () => (
        <TouchableOpacity
            onPress={() => setShowModal(true)}
            style={{ backgroundColor: '#272727', width: 40, height: 40, borderRadius: 50, alignItems: 'center', padding: 5, justifyContent: 'center' }}>
            <Image source={assets.more} style={{ width: 20, height: 20, tintColor: 'white' }} />

        </TouchableOpacity>
    )

    const toggleIsPublic = () => {
        db.collection(deskCategory.toLowerCase())
            .doc(deskItem.id)
            .update({
                isPublic: !deskItem?.isPublic
            })
    }

    const onBookmarkPress = () => {
        setShowModal(false)
    }


    const onSharePress = () => {
        setShowModal(false)
    }

    const onEditPress = () => {
        setShowModal(false)
    }

    const onPublicPress = () => {
        setTimeout(() => setShowModal(false), 500)
    }


    const onDeletePress = () => {

    }


    return (
        <View style={{ backgroundColor: '#333', flex: 1 }}>
            <Header
                navigation={navigation}
                title={deskCategory}
                direction={'vertical'}
                headerRight={headerRight()}
                shadow


            />
            <View style={{ padding: 20, alignItems: 'center' }}>
                {/* <Text style={styles.sectionHeaderText}>Description</Text> */}
                <Text style={{ fontFamily: 'Kanit', color: 'white', fontSize: 24 }}>{deskItem?.title}</Text>
                <View style={{ flexDirection: 'row' }}>
                    {deskItem?.class && <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 18 }}>{deskItem.class + ": "}</Text>}

                    {deskItem?.sectionNumber && <Text style={{ fontFamily: 'Kanit', color: 'gray', fontSize: 18 }}>{deskItem?.section + " " + deskItem?.sectionNumber}</Text>}


                </View>

            </View>
            <OptionsModal
                showModal={showModal}
                options={['Bookmark', 'Share', 'Edit', 'Public', 'Delete']}
                redIndex={5}
                toValue={-400}
                switchIndex={3}
                onToggle={toggleIsPublic}
                isOn={deskItem?.isPublic}

                onCancelPress={() => setShowModal(false)}
                onOptionPress={[onBookmarkPress, onSharePress, onEditPress, onPublicPress, onDeletePress]}
            />

            {deskCategory !== 'Flashcards' ?

                <ScrollableImages images={deskItem?.files} />

                :

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
                    {/* <TouchableOpacity
                        onPress={() => {
                            setReset(!reset);
                            setCurrentIndex(currentIndex - 1);

                        }}
                        disabled={currentIndex === 0}>

                        <Image
                            source={assets.right_arrow}
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: currentIndex !== 0 ? Colors.light.primary : 'gray',
                                transform: [{ rotate: '180deg' }]
                            }} />

                    </TouchableOpacity> */}

                    <ScrollableFlashcards flashcards={deskItem?.cards} />
                    {/* <TouchableOpacity
                        disabled={currentIndex === deskItem?.cards.length - 1}
                        onPress={() => {
                            setReset(!reset);
                            setCurrentIndex(currentIndex + 1);

                        }}>

                        <Image
                            source={assets.right_arrow}
                            style={{
                                width: 40,
                                height: 40,
                                tintColor: currentIndex !== deskItem?.cards.length - 1 ? Colors.light.primary : 'gray'
                            }} />

                    </TouchableOpacity> */}

                </View>


            }


            {deskItem?.description && <View style={{ padding: 20 }}>
                <Text style={styles.sectionHeaderText}>Description</Text>
                <Text style={{ fontFamily: 'Kanit', color: 'white' }}>{deskItem.description}</Text>
            </View>}


        </View>
    )
}

const styles = StyleSheet.create({
    sectionHeaderText: {
        fontFamily: 'KanitMedium',
        color: 'darkgray',
        fontSize: 18,
        marginVertical: 20
    }
})

export default DeskItem