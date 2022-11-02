import { NavigationContainer, DefaultTheme, DarkTheme, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Text, View } from 'react-native';
import { Colors, assets } from '../constants';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import {
  ChatRoom,
  Chats,
  Profile,
  SignIn,
  SignUpBirthday,
  SignUpEmailPassword,
  SignUpName,
  SignUpPhoto,
  SignUpSchool,
  BirthdaySettings,
  EmailSettings,
  GPASetttings,
  NameSettings,
  PasswordSettings
} from '../screens';
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
      />


      <Stack.Group>
        <Stack.Screen
          name="StartScreen"
          component={StartScreen} />

        <Stack.Screen
          name="SignUpEmailPassword"
          component={SignUpEmailPassword} />

        <Stack.Screen
          name="SignIn"
          component={SignIn} />

        <Stack.Screen
          name="SignUpName"
          component={SignUpName} />

        <Stack.Screen
          name="SignUpBirthday"
          component={SignUpBirthday} />

        <Stack.Screen
          name="SignUpSchool"
          component={SignUpSchool} />

        <Stack.Screen
          name="SignUpPhoto"
          component={SignUpPhoto} />

        <Stack.Screen
          name="SchoolPicker"
          component={SchoolPicker} />
      </Stack.Group>

      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={({ route }) => ({
          gestureDirection: "vertical",
          headerShown: false,
        })}

      />



      <Stack.Screen
        name="Chats"
        component={Chats}
      />



      <Stack.Screen
        name="AddClasses"
        component={AddClasses}
        options={{
          gestureDirection: 'vertical',
        }}

      />

      <Stack.Screen
        name="Settings"
        component={Settings}
      />

      <Stack.Screen
        name="SchoolSettings"
        component={SchoolSettings}
      />

      <Stack.Screen
        name="BirthdaySettings"
        component={BirthdaySettings}
      />

      <Stack.Screen
        name="NameSettings"
        component={NameSettings}
      />

      <Stack.Screen
        name="EmailSettings"
        component={EmailSettings}
      />

      <Stack.Screen
        name="PasswordSettings"
        component={PasswordSettings}
      />

      <Stack.Screen
        name="GPASettings"
        component={GPASetttings}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
      />

      <Stack.Screen
        name="CurrentUserProfile"
        component={CurrentUserProfile}
      />

      <Stack.Screen
        name="EditProfile"
        children={({ route }) => { return <EditProfile route={route} /> }}
      />

      <Stack.Screen
        name="Notes"
        children={({ route }) => { return <Notes route={route} /> }}
        options={{
          gestureDirection: 'vertical',

        }}
      />

      <Stack.Screen
        name="PrivateChats"
        component={Chats}
      />

      <Stack.Screen
        name="Camera"
        component={CameraScreen}
      />

      <Stack.Screen
        name="EditPictureToSend"
        children={({ route }) => { return <EditPictureToSend route={route} /> }}
        options={{
          animation: 'none',
          gestureEnabled: false,
        }}

      />

      <Stack.Screen
        name="EditVideoToSend"
        children={({ route }) => { return <EditVideoToSend route={route} /> }}
        options={{
          animation: 'none',
          gestureEnabled: false,
        }}

      />

      <Stack.Screen
        name="ChatRoom"
        children={({ route }) => { return <ChatRoom route={route} /> }}
      />

    </Stack.Navigator >
  );
}



