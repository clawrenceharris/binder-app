import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import CircleButton from './CircleButton';
import { FontAwesome, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { assets, Colors } from '../constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import ClassProfileImage from './ClassProfileImage';
import useColorScheme from '../hooks/useColorScheme';
import ProfileCircle from './ClassProfileCircle';
import Active from './Active';
import moment from 'moment';
import CallButton from './CallButton';
import UserProfileCircle from './UserProfileCircle';
const ICON_SIZE = 25;

const PrivateChatHeader = ({ route }) => {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const user = route.params.chatRoom.users[0];
    return (
        <View style={{ backgroundColor: Colors[colorScheme].background, marginTop: 50, marginLeft: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CircleButton
                        Icon={<Image
                            source={assets.left_arrow}
                            style={{ width: 20, height: 20, marginRight: 10 }}
                        />}
                        onPress={() => { navigation.goBack() }}

                    />
                    <UserProfileCircle user={user} showStudyBuddy showStoryBoder bold size={40} showName />
                </View>

                <View style={{ marginLeft: 15 }}>
                    <Text style={[styles.name, { color: Colors[colorScheme].tint }]}>{user.firstName}</Text>
                    <Active timestamp={moment.now()} />
                </View>

            </View>
            <View style={{ flexDirection: 'row', margin: 10, justifyContent: 'space-between', width: 90 }}>

                <CallButton />



            </View>



            {/* <View style={styles.classHeader}>
                <CircleButton
                    Icon={<Image
                        source={assets.horn}
                        style={styles.icon} />}
                    onPress={() => { navigation.navigate('PrivateChats', { class: route.params.class }) }}
                    color='#EFEFEF'
                />

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <ClassProfileImage Class={route.params.class} />

                </View>
                
            </View> */}
        </View>
    )
}


const styles = StyleSheet.create({


    icon: {
        tintColor: Colors.light.tint,
        width: ICON_SIZE,
        height: ICON_SIZE

    },


    name: {
        fontSize: 20,
        fontWeight: '800',


    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        width: '60%'

    },


})


export default PrivateChatHeader