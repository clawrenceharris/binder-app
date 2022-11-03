import { faker } from "@faker-js/faker"
import Announcements from "./Announcements";
import ChatRooms from "./ChatRooms";
import Users from "./Users";

const getRandomLocation = () => {
    const streetAddress = faker.address.streetAddress();
    const state = faker.address.state();
    const zipCode = faker.address.zipCodeByState(state);
    return streetAddress + " " +
        state + " " +
        zipCode
}

export default [



    {
        name: 'Annapolis High School',
        scheduleType: 'Periods',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: [],
        classes: [
            {

                name: 'Algebra I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],


                announcements: Announcements[0],


            },
            {

                name: 'Chemistry',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],



                announcements: Announcements[1],

            },
            {

                name: 'Physical Education',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],



                announcements: Announcements[2],


            },

            {

                name: 'Foundations of Technology',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],


                announcements: Announcements[2],

            },

            {

                name: 'Gender & Sexuality Studies',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Religion',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Music Theory',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Fine Art I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Graphic Design',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Literature and Composition',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },



        ]


    }, {
        name: 'Chesapeake Middle School',
        scheduleType: 'Periods',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: [],
        classes: [
            {

                name: 'Algebra I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],


                announcements: Announcements[0],


            },
            {

                name: 'Chemistry',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],



                announcements: Announcements[1],

            },
            {

                name: 'Physical Education',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],



                announcements: Announcements[2],


            },

            {

                name: 'Foundations of Technology',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2]
                ],


                announcements: Announcements[2],

            },

            {

                name: 'Gender & Sexuality Studies',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Religion',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Music Theory',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Fine Art I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Graphic Design',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },

            {

                name: 'Literature and Composition',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [
                    Users[0],
                    Users[1],
                    Users[2],
                    Users[3],
                    Users[4],


                ],


                announcements: Announcements[2],


            },



        ]


    }, {
        name: 'Berry High School',
        type: '',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: [],
        classes: [
            {

                name: 'Algebra I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [],
                announcements: Announcements[0],


            },
            {

                name: 'Chemistry',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                users: [],
                announcements: Announcements[1],

            },
            {

                name: 'Physical Education',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],


            },

            {

                name: 'Foundations of Technology',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Gender & Sexuality Studies',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {
                name: 'Religion',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {
                name: 'Music Theory',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {
                name: 'Fine Art I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2]
            },

            {

                name: 'Graphic Design',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Literature and Composition',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],

            },
        ]


    }, {
        name: 'Towson University',
        scheduleType: 'Date',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: [],
        classes: [
            {

                name: 'Algebra I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[0],


            },
            {

                name: 'Chemistry',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[1],

            },
            {

                name: 'Physical Education',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],


            },

            {

                name: 'Foundations of Technology',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],

            },

            {

                name: 'Gender & Sexuality Studies',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Religion',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],


            },

            {

                name: 'Music Theory',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Fine Art I',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Graphic Design',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },

            {

                name: 'Literature and Composition',
                description: '',
                startDate: new Date(),
                endDate: new Date(),
                building: '',
                room: '',
                teacher: '',
                announcements: Announcements[2],
            },
        ]
    },
]