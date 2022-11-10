// @refresh reset
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useFonts } from 'expo-font';
import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
// import AsyncStorage from '@react-native-community/async-storage'
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { auth, db, updateCollection } from './Firebase/firebase';
import Schools from './constants/data/Schools';
import Classes from './constants/data/Classes';
import { faker } from '@faker-js/faker';
import firebase from 'firebase/compat';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import DropdownAlert from 'react-native-dropdownalert';
import messaging from '@react-native-firebase/messaging'
export default function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [schoolChatrooms, setSchoolChatrooms] = useState(null)
  const [classChatRooms, setClassChatRooms] = useState(null)
  const [classes, setClasses] = useState([])
  const [ref, setRef] = useState(null)
  let alertRef = useRef(null)
  const [loaded] = useFonts({
    Kanit: require('./assets/fonts/Kanit-Regular.ttf'),
    KanitBold: require('./assets/fonts/Kanit-Bold.ttf'),
    KanitMedium: require('./assets/fonts/Kanit-Medium.ttf'),
    KanitSemiBold: require('./assets/fonts/Kanit-SemiBold.ttf'),
  });

  useEffect(() => {

  }, [])

  // const requestPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL

  //   if (enabled) {
  //     console.log("Authorization status: ", authStatus)
  //   }

  // }




  if (!loaded) {
    return <Text style={StyleSheet.absoluteFillObject}>Loading...</Text>
  }
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>

        <Navigation colorScheme={colorScheme} />
        <StatusBar style='light' />
      </SafeAreaProvider>
    );
  }
}




