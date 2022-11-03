
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    mainContainer: {
        padding: 10,
    },
    description: {
        fontFamily: 'Kanit',
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        margin: 5
    },
    finePrint: {
        fontFamily: 'Kanit',
        color: 'lightgray',
        fontSize: 11,
        textAlign: 'center',
    },

    errorMessage: {
        color: '#FD6464',
        fontFamily: 'Kanit'
    },
    successMessage: {
        color: '#77FF8C',
        fontFamily: 'Kanit'
    },

    birthdayInputContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 20,
        marginTop: 40,
        flexDirection: 'row'
    },
    input: {
        color: 'white',
        padding: 15,
        fontSize: 18,
        width: '100%',
        backgroundColor: '#474747',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomColor: '#6F6F6F',
        borderBottomWidth: 1,

    },

})

const descriptions = {
    password: 'To change your password, enter your existing password first.',
    email: 'This makes it easier for you to recover your account and for people to find you.',
    gpa: 'Your GPA is your grade point average. We use you unweighted GPA to help pair you with recommended study partners. You can choose to leave this field blank',
    name: "This is how you'll appear and how people can find you on Binder, so choose a name your classmates know you by.",
    birthday: "You must be at least 12 years old to use Binder. We'll use this information to determine your age, Zodiac Sign, and let your classmates know when your special day arrives.",
    school: "This makes it easier for us to show you the right classes, recommend study partners, inform you about school events and more!"


}

export { styles, descriptions }