import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library'
import { useState } from "react";

export async function pickImage() {
    let result = ImagePicker.launchCameraAsync();
    return result;
}

export async function askForCameraPermission() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
}

export async function openMediaLibrary(mediaType, selectionLimit) {

    const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (galleryStatus.status === 'granted') {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: [mediaType] })

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            selectionLimit: selectionLimit
        });

        if (!result.cancelled && result != null) {
            return result.uri;
        }
    }
    return null


}

