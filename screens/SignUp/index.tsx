import SignUpBirthday from "./SignUpBirthday";
import SignUpEmailPassword from "./SignUpEmailPassword";
import SignUpName from "./SignUpName";
import SignUpSchool from "./SignUpSchool";
import SignUpPhoto from "./SignUpPhoto";
import { Colors } from "../../constants";
import { StyleSheet } from "react-native";

const descriptions = {
    password: 'To change your password, enter your existing password first.',
    email: 'This makes it easier for you to recover your account and for people to find you.',
    gpa: 'Your GPA is your grade point average. We use you unweighted GPA to help pair you with recommended study partners. You can choose to leave this field blank',
    name: "This is how you'll appear and how people can find you on Binder, so choose a name your classmates know you by.",
    birthday: "You must be at least 12 years old to use Binder. We'll use this information to determine your age, Zodiac Sign, and let your classmates know when your special day arrives.",
    school: "This makes it easier for us to show you the right classes, recommend study partners, inform you about school events and more!"


}

const styles = StyleSheet.create({
    continueBtn: {
        borderRadius: 25,
        backgroundColor: Colors.light.primary,
        padding: 15,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },


    textInputTitle: {
        color: 'lightgray',
        alignSelf: 'flex-start',
        fontSize: 12
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

    screenTitle: {
        color: 'white',
        fontFamily: 'KanitMedium',
        fontSize: 24,
        alignSelf: 'center'
    },

    birthdayInputContainer: {
        alignItems: 'center',
        width: '100%',
        padding: 20,
        marginTop: 40,
        flexDirection: 'row'
    },
    input: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 2,
        width: '100%',
        fontSize: 20,
        padding: 5,
        color: 'white'
    },

    description: {
        fontFamily: 'Kanit',
        color: 'gray',
        fontSize: 14,
        textAlign: 'center',
        margin: 5
    },

})

export { SignUpBirthday, SignUpEmailPassword, SignUpName, SignUpPhoto, styles, descriptions }
