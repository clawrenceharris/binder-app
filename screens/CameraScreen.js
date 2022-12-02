import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    TouchableOpacity,
    useColorScheme,
    Linking,
    SafeAreaView
} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { assets, Colors } from '../constants'
import Classes from '../constants/data/Classes'
import ClassChatListItem from '../components/ClassChatListItem'
import { SHADOWS } from '../constants/Theme'
import CameraHeader from '../components/CameraHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import ClassProfileCircle from '../components/ClassProfileCircle'
import * as ImagePicker from 'expo-image-picker'
import ModalComponent from '../components/Modal'
import * as Haptics from 'expo-haptics'
import CameraButton from '../components/CameraButton'
import { haptics } from '../utils'

const MAX_VIDEO_DURATION = 10000

const CameraScreen = ({ navigation }) => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasAudioPermission, setHasAudioPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const colorScheme = useColorScheme();
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [isRecording, setIsRecording] = useState(false)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flashMode, setFlashMode] = useState(false)
    const [openCameraModal, setOpenCameraModal] = useState()
    const cameraRef = useRef(null)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const route = useRoute();
    const [galleryItems, setGalleryItems] = useState([])
    const [pressOut, setPressOut] = useState(null)
    const [lastTap, setLastTap] = useState(null);
    const [pressIn, setPressIn] = useState(null)
    const [canTakePicture, setCanTakePicture] = useState(true)
    const sheetRef = useRef(null);
    const snapPoints = ['1%', '100%']
    const canRecord = route.params?.canRecord != undefined ? route.params.canRecord : true
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            console.log(type)
            if (type == Camera.Constants.Type.back) {
                setType(Camera.Constants.Type.front)

            }
            if (type == Camera.Constants.Type.front) {
                setType(Camera.Constants.Type.back)
                haptics('light')
            }
        } else {
            setLastTap(now);
        }
    }

    const onFlipPressed = () => {
        if (type == Camera.Constants.Type.back) {
            setType(Camera.Constants.Type.front)
            haptics('light')
        }
        if (type == Camera.Constants.Type.front) {
            setType(Camera.Constants.Type.back)
            haptics('light')
        }
    }

    useEffect(() => {
        (async () => {

            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status === 'granted')

            if (galleryStatus.status === 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['photo', 'video'] })
                setGalleryItems(userGalleryMedia.assets)
            }


        })();
    }, [])
    const recordVideo = async () => {
        setCanTakePicture(false)
        setIsRecording(true)
        if (cameraRef) {
            try {
                const options = { maxDuration: MAX_VIDEO_DURATION, quality: Camera.Constants.VideoQuality['480'] }
                const videoRecordPromise = cameraRef.current.recordAsync(options)
                setIsRecording(true)
                if (videoRecordPromise) {
                    setIsRecording(false)

                    const data = await videoRecordPromise;
                    setVideo(data.uri)
                    route.params.setVideo(result.uri)
                    navigation.goBack()

                }
            } catch (e) {
                console.warn(e)
            }
        }


    }

    const stopRecording = () => {
        if (cameraRef) {

            cameraRef.current.stopRecording()


        }
    }
    const takePicture = async () => {
        if (cameraRef) {
            try {
                const data = await cameraRef.current.takePictureAsync();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

                route.params.setImage(data.uri)
                navigation.goBack()

            } catch (e) {
                console.log(e)
            }
        }
    }





    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspectRatio: [16, 9],
            selectionLimit: 3
        });

        if (!result.cancelled && result != null) {
            if (result.type == 'video') {
                route.params.setVideo(result.uri)
                navigation.goBack()


            }

            else if (result != null && result.type == 'image') {
                route.params.setImage(result.uri)
                navigation.goBack()

            }
        }

    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.container}
                onStartShouldSetResponder={() => true}
                onResponderRelease={() => {
                    setIsRecording(false);
                    stopRecording();
                    if (canTakePicture && !video) {
                        takePicture()
                    }
                }}
                onResponderGrant={handleDoubleTap}>


                {/* {!hasCameraPermission && <ModalComponent toValue={-1300} height={330} open={openCameraModal} renderContent={(
                <View>
                    <View style={{ borderBottomColor: Colors[colorScheme].tint, borderBottomWidth: 1, padding: 10 }}>
                        <Text style={{ fontFamily: 'KanitMedium', color: Colors[colorScheme].tint, fontSize: 16, textAlign: 'center' }}>Uh oh!</Text>


                    </View>
                    <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].tint, textAlign: 'center', marginTop: 20 }}>Binder needs acces to your camera. Allow access in Settings to start taking pics!</Text>
                    <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].tint, borderRadius: 50, padding: 10, marginTop: 30 }} onPress={() => { Linking.openSettings() }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].background, textAlign: 'center', fontSize: 16 }}>Allow</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: Colors[colorScheme].tint, borderRadius: 50, padding: 10, marginTop: 30 }} onPress={() => { setOpenCameraModal(false) }}>
                        <Text style={{ fontFamily: 'Kanit', color: Colors[colorScheme].background, textAlign: 'center', fontSize: 16 }}>Don't Allow</Text>
                    </TouchableOpacity>
                </View>



            )} />} */}


                <Camera
                    style={styles.camera}
                    type={type}
                    flashMode={flashMode}
                    ref={cameraRef}
                    ratio={'16:9'}
                    onCameraReady={() => { setIsCameraReady(true) }}

                />


            </View>




            {route.params?.chatroom && <View style={styles.sendToContainer}>
                {route.params.chatRoom.type === 'private' && <Text style={{ fontFamily: 'KanitMedium', color: 'white', fontSize: 18 }}>Send to {route.params.chatRoom.users[0].firstName}</Text>}
                {route.params.chatRoom.type === 'group' && <Text style={{ position: 'absolute', fontSize: 16, fontFamily: 'Kanit', color: 'white' }}></Text>}

            </View>}

            <View style={styles.topContainer}>


                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={assets.close} style={styles.icon} />
                </TouchableOpacity>



                <TouchableOpacity onPress={() => { setFlashMode(!flashMode) }}>
                    <View>
                        {!flashMode && <Image source={assets.flash_off} style={styles.icon} />}
                        {flashMode && <Image source={assets.flash} style={[styles.icon, { tintColor: 'white' }]} />}

                    </View>


                </TouchableOpacity>

            </View>

            <View style={styles.bottomContianer}>
                <View style={{ flex: 1 }}>
                    {!isRecording &&

                        <TouchableOpacity
                            style={styles.galleryButton}
                            onPress={pickFromGallery}
                        >
                            {galleryItems[0] == undefined
                                ?
                                <></>
                                :
                                <Image source={{ uri: galleryItems[0].uri }} style={styles.galleryButtonImage} />
                            }
                        </TouchableOpacity>}
                </View>


                <View style={{ flex: 1, alignSelf: 'center', width: '100%' }}>



                    <TouchableOpacity
                        onLongPress={route.params?.canRecord && recordVideo}
                        delayLongPress={500}
                        onPress={takePicture}
                    >

                        <CameraButton maxDuration={MAX_VIDEO_DURATION} isRecording={isRecording} />

                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }} >
                    {!isRecording && <TouchableOpacity style={{ flex: 1 }} onPress={onFlipPressed}>
                        <Image source={assets.flip} style={[styles.icon, { width: 35, height: 35, marginTop: 40 }]} />
                    </TouchableOpacity>}
                </View>



            </View>

        </SafeAreaView >

    );


}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'black'
    },
    camera: {
        flex: 1,
        aspectRatio: 9 / 16,

    },

    cameraButtonContainer: {
        flex: 1,

    },
    cameraButton: {
        borderColor: '#ffffff4D',
        borderWidth: 10,
        width: 90,
        height: 90,
        borderRadius: 50,
        bottom: '5%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },


    image: {
        width: '100%',
        height: '100%'
    },

    icon: {
        width: 28,
        height: 28,
        tintColor: 'white',

    },
    sendToContainer: {
        // backgroundColor: '#00000086',
        position: 'absolute',
        top: 40,
        height: 45,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

        ...SHADOWS.medium

    },

    bottomContianer: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: '5%',
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'

    },

    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 45,
        width: '100%',
        padding: 20
    },

    send: {
        width: 35,
        height: 35,
        tintColor: 'white',
        marginLeft: 10
    },

    sendToText: {
        zIndex: 1,



    },

    galleryButton: {
        width: 38,
        height: 38,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        marginLeft: 60,
        overflow: 'hidden'

    },

    galleryButtonImage: {
        width: 38,
        height: 38,
    },
    sideBarContainer: {
        top: 60,
        marginHorizontal: 20,
        right: 0,
        position: 'absolute'
    }


})
export default CameraScreen