import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Notes } from '../types';
import CircleButton from './CircleButton';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../constants/index.ts';
import { StyleSheet } from 'react-native';
import { SHADOWS } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';



export type NotesProps = {
    notes: Notes;



}
const NotesMessage = (props: NotesProps, { }) => {
    const { notes } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => { navigation.navigate('Notes', { notes }) }}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={notes.owner.images[0]} style={{ width: 25, height: 25, marginRight: 10 }} />
                    <View>
                        <Text style={{ fontWeight: '500', color: Colors.light.tint, fontFamily: 'Kanit' }}>{notes.owner.firstName}</Text>

                        <Text style={{ color: 'lightgray', fontFamily: 'Kanit' }}>{notes.section}</Text>
                    </View>

                </View>



            </View>
            <View>

                <Image source={notes.images[0].image} style={styles.image} />
                <View style={styles.imageOverlay} />
                <Text style={{ position: 'absolute', color: 'white', fontWeight: 'bold', fontSize: 24, textAlign: 'center', width: "70%", alignSelf: 'center', fontFamily: 'KanitBold', marginTop: '15%' }}>{notes.title}</Text>


            </View>



        </TouchableOpacity>


    )
}
const styles = StyleSheet.create({
    container: {

        padding: 10,
        width: 250,
        backgroundColor: 'white',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },

    image: {
        width: 250,
        height: 200,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25
    },

    imageOverlay: {
        width: 250,
        height: 200,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4

    }
})
export default NotesMessage