import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'

var firebaseConfig = {

    apiKey: "AIzaSyBI5SBqfoI_4on8BXUhVgeLmtjMhrdijzM",
    authDomain: "binder-b38fd.firebaseapp.com",
    projectId: "binder-b38fd",
    storageBucket: "binder-b38fd.appspot.com",
    messagingSenderId: "769307324915",
    appId: "1:769307324915:web:22ea662cb9fc0a6f602286",
    measurementId: "G-VF1PD1RCC2"


}

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
}
else {
    app = firebase.app()
}
const db = app.firestore()
const auth = firebase.auth()

export function signIn(email, password) {

    return signInWithEmailAndPassword(auth, data.email, data.password)
        .then(userCredentials => {
            const user = userCredentials.user;

        })
        .catch(error => alert(error.message))
}

export function updateUserProfile(displayName, photoURL) {
    updateProfile(auth.currentUser, { displayName: displayName, photoURL: photoURL }).catch((error) => { return error })
}

export function reauthenticate(currentPassword) {
    var user = auth.currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
}

export function changePassword(currentPassword, newPassword) {
    reauthenticate(currentPassword).then(() => {
        var user = auth.currentUser;
        user.updatePassword(newPassword).then(() => {
            console.log("Password updated!");
        }).catch((error) => { console.log(error); });
    }).catch((error) => { console.log(error); });
}
export function changeEmail(currentPassword, newEmail) {
    reauthenticate(currentPassword).then(() => {
        var user = auth.currentUser;
        user.updateEmail(newEmail).then(() => {
            console.log("Email updated!");
        }).catch((error) => { return (error.message); });
    }).catch((error) => { return (error.message); });
    return null

}

export function updateCollection(collection, id, data) {
    db.collection(collection).doc(id).update({
        ...data
    })

}

export function RemoveUserFromClass(classID, userUid) {

    updateCollection('classes', classID, { users: firebase.firestore.FieldValue.arrayRemove(db.collection('users').doc(userUid)) });
    updateCollection('users', userUid, { classes: firebase.firestore.FieldValue.arrayRemove(db.collection('classes').doc(classID)) });
}


export function AddUserToClass(classID, userUid) {
    updateCollection('classes', classID, { users: firebase.firestore.FieldValue.arrayUnion(db.collection('users').doc(userUid)) });
    updateCollection('users', userUid, { classes: firebase.firestore.FieldValue.arrayUnion(db.collection('classes').doc(classID)) });
}


export function RemoveUserFromSchool(schoolID, userUid) {
    var user = null
    db.collection('users')
        .doc(userUid)
        .get()
        .then((doc) => {
            updateCollection('schools', schoolID, { users: firebase.firestore.FieldValue.arrayRemove(doc.data()) });
        })

    updateCollection('users', userUid, { school: null });
}


export function AddUserToSchool(schoolID, userUid) {
    var user = null
    db.collection('users')
        .doc(userUid)
        .get()
        .then((doc) => {
            updateCollection('users', userUid, { classes: [] })
            updateCollection('schools', schoolID, { users: firebase.firestore.FieldValue.arrayUnion(doc.data()) });
        })

    updateCollection('users', userUid, { school: db.collection('schools').doc(schoolID) });

}

// export function getUserSnapshot(userUid = auth.currentUser.uid, setUser) {
//     db
//         .collection('users')
//         .doc(userUid)
//         .onSnapshot((doc) => {
//             setUser(doc.data())
//         })


// }


// export async function getSchools(setSchools) {
//     var schools = []
//     var query = await db
//         .collection('schools')
//         .get()

//     query.forEach((doc) => {
//         schools.push(doc.data())
//     })

//     setSchools(schools)
// }





// export async function getClasses(setClasses) {
//     var classes = []
//     var query = await db
//         .collection('classes')
//         .get()

//     query.forEach((doc) => {
//         classes.push(doc.data())
//     })

//     setClasses(classes)
// }

// export function getUser(userUid = auth.currentUser.uid, setUser) {
//     db
//         .collection('users')
//         .doc(userUid)
//         .get()
//         .then(doc => {
//             setUser(doc.data())
//         })
//         .catch((error) => {
//             console.log(error);
//         })



// }



// export function getSchool(schoolID, setSchool) {
//     db
//         .collection('schools')
//         .doc(schoolID)
//         .get()
//         .then((doc) => {
//             setSchool(doc.data())
//         })
//         .catch((error) => {
//             console.log(error);
//         })

// }



// export function getUserSchool(userUid, setSchool) {
//     db
//         .collection('users')
//         .doc(userUid)
//         .onSnapshot((doc) => {
//             if (doc.data().school) {

//                 db
//                     .collection('schools')
//                     .doc(doc.data().school.id)
//                     .get()
//                     .then((doc) => {
//                         setSchool(doc.data())
//                     })
//             }

//         })

// }



// export function getClass(classID, setClass) {
//     db
//         .collection('classes')
//         .doc(classID)
//         .get()
//         .then((doc) => {
//             setClass(doc.data())
//         })


// }


// export function getClassSnapshot(classID, setClass) {
//     db
//         .collection('classes')
//         .doc(classID)
//         .onSnapshot((doc) => {
//             setClass(doc.data())
//         })


// }


// export function getUsers(collection, docId, orderBy = 'lastActive', setUsers) {

//     db
//         .collection(collection).doc(docId)
//         .orderBy(orderBy)
//         .get()
//         .then(doc => {
//             setUsers(doc.data().users)
//         })




// }




export function signUp(email, password, name, photoURL, school) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user

            user.updateProfile({
                displayName: name,
                school: school,
                photoURL: photoURL


            }).then(function () {
                //signup successful
                // navigation.navigate('Root', { user: user })

            }).catch(function (error) {
                //an error happened
            })

            //navigation.popToTop()
        })
        .catch((error) => {
            alert(error.message)
        })



}



export { db, auth }

