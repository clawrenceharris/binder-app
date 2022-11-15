import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootTabScreenProps, BottomTabParamList } from '../types';
import { CameraScreen, Chats, ClassesScreen, Profile } from '../screens';
import Desk from '../screens/Desk';
import Playground from '../screens/Playground';
import { SHADOWS, SIZES } from '../constants/Theme';
import { UserProfileCircle } from '../components';
import { createDrawerNavigator, useIsDrawerOpen } from '@react-navigation/drawer';
import Chat from '../screens/Chat';
import CurrentUserProfile from '../screens/CurrentUserProfile';
import Settings from '../screens/Settings/Settings';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import EditNameModal from '../components/EditNameModal';

const Drawer = createDrawerNavigator();






function ChatScreen({ navigation }) {
    return (
        <Drawer.Navigator
            initialRouteName="Chat"
            drawerStyle={{
                backgroundColor: '#333',
                width: '80%',
            }}
            drawerType={'slide'}
            drawerContent={() => {
                return (
                    <CurrentUserProfile navigation={navigation} />



                )
            }}>
            <Drawer.Screen name='Chat' component={Chat} />
            <Drawer.Screen name='Profile' component={CurrentUserProfile} />


        </Drawer.Navigator>)
}

function Home({ navigation }) {


    return (

        <Drawer.Navigator

            initialRouteName="Classes"
            drawerStyle={{
                backgroundColor: '#333',
                width: '80%',
            }}
            drawerType={'slide'}
            drawerContent={() => {
                return (
                    <CurrentUserProfile navigation={navigation} />



                )
            }}>
            <Drawer.Screen name='Classes' component={ClassesScreen} />
            <Drawer.Screen name='Profile' component={CurrentUserProfile} />


        </Drawer.Navigator>)
}

function DeskScreen({ navigation }) {


    return (

        <Drawer.Navigator

            initialRouteName="Desk"
            drawerStyle={{
                backgroundColor: '#333',
                width: '80%',
            }}
            drawerType={'slide'}
            drawerContent={() => {
                return (
                    <CurrentUserProfile navigation={navigation} />



                )
            }}>
            <Drawer.Screen name='Desk' component={Desk} />
            <Drawer.Screen name='Profile' component={CurrentUserProfile} />


        </Drawer.Navigator>)
}



const styles = StyleSheet.create({
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.5,
        elevation: 5
    }
})




const NewPostButton = ({ children, onPress }) => (
    <TouchableOpacity
        style={{ top: -20, justifyContent: 'center', alignItems: 'center', ...styles.shadow, shadowColor: 'lightgray', elevation: 5 }}
        onPress={onPress}
    >
        <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: Colors.light.primary, alignItems: 'center', justifyContent: 'center' }}>
            {children}

        </View>

    </TouchableOpacity>
)






export default function BottomTabNavigator({ currentUser }) {
    const colorScheme = useColorScheme();
    const BottomTab = createBottomTabNavigator();
    const ICON_SIZE = 28
    function getTabBarVisibility(route) {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : '';

        if (routeName === 'Post') {
            return false;
        }

        return true;
    }
    return (

        <BottomTab.Navigator
            initialRouteName="Home"

            screenOptions={{

                tabBarStyle: {
                    backgroundColor: 'white',
                    height: 70,

                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    borderRadius: 20,
                    ...SHADOWS.dark,

                },
                tabBarActiveTintColor: Colors.light.primary,

                headerTitleStyle: { fontFamily: 'KanitBold', fontSize: 26, color: Colors.light.background },

            }}>


            <BottomTab.Screen
                name="Home"

                component={Home}
                options={{

                    headerShown: false,
                    title: '',
                    tabBarIcon: ({ color }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.school} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )


                }}

            />




            <BottomTab.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ color }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.send} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE, transform: [{ rotateZ: '-90deg' }] }} />
                        </View>
                    )
                }}
            />




            <BottomTab.Screen
                name="Post"
                component={CameraScreen}
                options={({ route }) => ({
                    tabBarVisible: false,
                    tabBarStyle: { display: 'none' },
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ color }) => (

                        <Image
                            source={assets.capture}
                            style={{ tintColor: 'white', width: 30, height: 30, top: 7 }} />
                    ),
                    tabBarButton: (props) => (
                        <NewPostButton {...props} />
                    )
                })}
            />





            <BottomTab.Screen

                name="Desk"
                component={DeskScreen}
                options={{
                    title: '',
                    headerShown: false,

                    tabBarIcon: ({ color }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.desk} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )
                }}
            />



            <BottomTab.Screen
                name="Playground"
                component={Playground}
                options={{
                    headerShown: false,

                    title: '',
                    tabBarIcon: ({ color }) => (

                        <View style={{ alignItems: 'center', justifyContent: 'center', top: 20 }}>
                            <Image source={assets.playground} style={{ tintColor: color, width: ICON_SIZE, height: ICON_SIZE }} />
                        </View>
                    )
                }}
            />

        </BottomTab.Navigator>
    );
}
