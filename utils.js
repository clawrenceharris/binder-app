import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from 'expo-media-library'
import { useState } from "react";
import { auth } from "./Firebase/firebase";
import * as Haptics from 'expo-haptics'

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

export function getZodiacSign(day, month, isEmoji) {

    let sign = "Unknown";
    console.log("Day ", day)

    if (month == 12) {

        if (day < 22)
            sign = !isEmoji ? "Sagittarius" : '♐️';
        else
            sign = !isEmoji ? "Capricorn" : '♑️';
    }

    else if (month == 1) {
        if (day < 20)
            sign = !isEmoji ? "Capricorn" : '♑️';
        else
            sign = !isEmoji ? "Aquarius" : '♒️';
    }

    else if (month == 2) {
        if (day < 19)
            sign = !isEmoji ? "Aquarius" : '♒️';
        else
            sign = !isEmoji ? "Pisces" : '♓️';
    }

    else if (month == 3) {
        if (day < 21)
            sign = !isEmoji ? "Pisces" : '♓️';
        else
            sign = !isEmoji ? "Aries" : '♈️';
    }
    else if (month == 4) {
        if (day < 20)
            sign = !isEmoji ? "Aries" : '♈️';
        else
            sign = !isEmoji ? "Taurus" : '♉️';
    }

    else if (month == 5) {
        if (day < 21)
            sign = !isEmoji ? "Taurus" : '♉️';
        else
            sign = !isEmoji ? "Gemini" : '♊️';
    }

    else if (month == 6) {
        if (day < 21)
            sign = !isEmoji ? "Gemini" : '♊️';
        else
            sign = !isEmoji ? "Cancer" : '♋️';
    }

    else if (month == 7) {
        if (day < 23)
            sign = !isEmoji ? "Cancer" : '♋️';
        else
            sign = !isEmoji ? "Leo" : '♌️';
    }

    else if (month == 8) {
        if (day < 23)
            sign = "Leo";
        else
            sign = !isEmoji ? "Virgo" : '♍️';
    }

    else if (month == 9) {
        if (day < 23)
            sign = !isEmoji ? "Virgo" : '♍️';
        else
            sign = !isEmoji ? "Libra" : '♎️';
    }

    else if (month == 10) {
        if (day < 23)
            sign = !isEmoji ? "Libra" : '♎️';
        else
            sign = !isEmoji ? "Scorpio" : '♏️';
    }

    else if (month == 11) {
        if (day < 22)
            sign = !isEmoji ? "Scorpio" : '♏️';
        else
            sign = !isEmoji ? "Sagittarius" : '♐️';
    }

    return sign


}

export function getDisplayName(firstName, lastName) {
    let displayName = ""
    if (!firstName) {
        displayName = lastName
    }
    else if (!lastName) {
        displayName = firstName
    }
    else {
        displayName = firstName + " " + lastName
    }
    if (displayName)
        return displayName
    return "Someone"

}


export function getDisplayNameOrYou(userData) {

    let displayName = ""

    if (userData?.uid === auth.currentUser.uid) {
        return "You"
    }

    if (!userData?.firstName) {
        displayName = userData?.lastName
    }
    else if (!userData?.lastName) {
        displayName = userData?.firstName
    }
    else {
        displayName = userData?.firstName + " " + userData?.lastName
    }
    if (displayName)
        return displayName
    return "Someone"

}

export function haptics(feedbackStyle) {
    if (feedbackStyle === 'light')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    else if (feedbackStyle === 'medium')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    else if (feedbackStyle === 'heavy')
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)


}





export function getName(firstName, lastName) {
    let name = ""
    if (!firstName) {
        name = lastName
    }
    else if (!lastName) {
        name = firstName
    }
    if (name)
        return name
    return "Someone"

}


