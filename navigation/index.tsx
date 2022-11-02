import { NavigationContainer, DefaultTheme, DarkTheme, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Text, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { ChatRoom, Chats, Profile, SignIn, SignUpBirthday, SignUpEmailPassword, SignUpName, SignUpPhoto, SignUpSchool } from '../screens';
import { SIZES } from '../constants/Theme';
import Notes from '../screens/Notes';
import NotesHeader from '../components/NotesHeader';
import { CameraScreen } from '../screens';
import EditPictureToSend from '../screens/EditPictureToSend';
import EditVideoToSend from '../screens/EditVideoToSend';
import AddClasses from '../screens/AddClasses';
import EditProfile from '../screens/EditProfile';
import SchoolPicker from '../screens/SchoolPicker';
import StartScreen from '../screens/StartScreen';
import Settings from '../screens/Settings/Settings';
import CurrentUserProfile from '../screens/CurrentUserProfile';
import Achievements from '../screens/Achievements';
import AchievementsScreen from '../screens/Achievements';
import SchoolSettings from '../screens/Settings/SchoolSettings';
import { BirthdaySettings, EmailSettings, GPASetttings, NameSettings, PasswordSettings } from '../screens/Settings';
// import { createDrawerNavigator } from '@react-navigation/drawer'



const Stack = createNativeStackNavigator();

export default function Navigation({ currentUser, colorScheme }: { currentUser: any, colorScheme: ColorSchemeName }) {
  return (

    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <RootNavigator currentUser={currentUser} />

    </NavigationContainer>
  );
}


// const Drawer = createDrawerNavigator();

function RootNavigator({ currentUser }) {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      initialRouteName='StartScreen'
      screenOptions={{
        headerShown: false,

        headerStyle: {

          backgroundColor: Colors[colorScheme].background,

        },
        headerTintColor: Colors[colorScheme].background,
        headerTitleAlign: 'left',
        animationDuration: 1000 / 7


      }} >
      <Stack.Screen
        name="Root"
        children={() => { return <BottomTabNavigator currentUser={currentUser} /> }}
        options={{
          title: "",
          headerShown: false
        }} />

      <Stack.Group>
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,
            title: '',
          })}

        />


        <Stack.Screen
          name="Achievements"
          component={AchievementsScreen}
          options={({ route }) => ({
            gestureDirection: "vertical",
            headerShown: false,
            title: '',
          })}

        />

        <Stack.Screen
          name="SignUpEmailPassword"
          component={SignUpEmailPassword}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,
            title: '',
          })}

        />

        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,
            title: '',
          })}

        />
        <Stack.Screen
          name="SignUpName"
          component={SignUpName}
          options={({ route }) => ({
            gestureEnabled: false,


            title: '',


          })}

        />

        <Stack.Screen
          name="SignUpBirthday"
          component={SignUpBirthday}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,

            title: '',


          })}

        />

        <Stack.Screen
          name="SignUpSchool"
          component={SignUpSchool}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,

            title: '',


          })}

        />

        <Stack.Screen
          name="SignUpPhoto"
          component={SignUpPhoto}
          options={({ route }) => ({
            gestureEnabled: false,
            headerShown: false,

            title: '',


          })}

        />

        <Stack.Screen
          name="SchoolPicker"
          component={SchoolPicker}
          options={({ route }) => ({
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: 'vertical',

            title: '',


          })}

        />
      </Stack.Group>

      <Stack.Screen
        name="Chats"
        component={Chats}
        options={({ route }) => ({
          headerShown: true,
          header: (props) =>
          (
            <View style={{ height: SIZES.header, backgroundColor: Colors[colorScheme].background }}>
            </View>
          ),
          title: '',
        })}

      />



      <Stack.Screen
        name="AddClasses"
        component={AddClasses}
        options={({ route }) => ({
          headerShown: false,
          gestureDirection: 'vertical',
          title: '',
        })}

      />

      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="SchoolSettings"
        component={SchoolSettings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="BirthdaySettings"
        component={BirthdaySettings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="NameSettings"
        component={NameSettings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="EmailSettings"
        component={EmailSettings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />


      <Stack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="GPASettings"
        component={GPASetttings}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />





      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="CurrentUserProfile"
        component={CurrentUserProfile}
        options={({ route }) => ({
          headerShown: false,
          title: '',
        })}

      />

      <Stack.Screen
        name="EditProfile"
        children={({ route }) => { return <EditProfile route={route} /> }}
        options={({ route }) => ({
          title: 'Edit Profile',
        })}

      />



      <Stack.Screen
        name="Notes"
        children={({ route }) => { return <Notes route={route} /> }}
        options={({ route }) => ({
          gestureDirection: 'vertical',
          headerShown: true,
          header: (props) =>
          (
            <View style={{ height: SIZES.header, backgroundColor: Colors[colorScheme].background, borderBottomColor: colorScheme === 'light' ? 'lightgray' : 'gray', borderBottomWidth: 1 }}>
              <NotesHeader route={route} />
            </View>
          ),
          title: ''

        })}

      />



      <Stack.Screen
        name="PrivateChats"
        component={Chats}

        options={{
          headerShown: false,
          title: '',
        }}

      />
      <Stack.Group>
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            gestureDirection: 'vertical',
            headerShown: false,
            title: '',
          }}

        />

      </Stack.Group>

      <Stack.Screen
        name="EditPictureToSend"
        children={({ route }) => { return <EditPictureToSend route={route} /> }}

        options={{
          animation: 'none',
          gestureEnabled: false,
          headerShown: false,
          title: '',
        }}

      />


      <Stack.Screen
        name="EditVideoToSend"
        children={({ route }) => { return <EditVideoToSend route={route} /> }}
        options={{
          animation: 'none',
          gestureEnabled: false,
          headerShown: false,
          title: '',
        }}

      />


      <Stack.Screen
        name="ChatRoom"
        children={({ route }) => { return <ChatRoom route={route} /> }}
        options={({ route }) => ({
          headerShown: true,
          header: (props) =>
          (
            <View style={{ height: SIZES.header, backgroundColor: Colors[colorScheme].background, borderBottomColor: colorScheme === 'light' ? 'lightgray' : 'gray', borderBottomWidth: 1 }}>
            </View>
          ),
          title: '',
        })}

      />



    </Stack.Navigator >
  );
}



