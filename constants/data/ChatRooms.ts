import assets from "../assets";
import Classes from "./Classes.js";
import Notes from "./Notes";
import PrivateChatRooms from "./PrivateChatRooms";
import Users from "./Users";

export default [
    {

        id: 0,
        name: 'Algebra I',
        type: 'group',
        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5], Users[6]],
        messages: [
            {
                user: Users[0],
                id: 0,
                content: 'Hey',
                contentType: 'message',

                timestamp: new Date(2022, 9, 12),
                icon: assets.chat,
                status: 'sent'

            },
            {
                user: Users[1],
                id: 1,
                content: 'Anyone do the hw?',
                contentType: 'message',

                timestamp: new Date(2022, 9, 13),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[5],
                id: 2,
                content: 'notes',
                contentType: 'notes',

                timestamp: new Date(2022, 9, 13),
                icon: assets.notes,
                status: 'sent'

            },

            {
                user: Users[5],
                id: 3,
                content: 'Heres the notes for section 1.1',
                contentType: 'message',

                timestamp: new Date(2022, 9, 13),
                icon: assets.notes,
                status: 'sent'

            }


        ]

    },
    {

        id: 1,
        type: 'group',

        name: 'Group Project😪',
        users: [Users[0], Users[1], Users[2], Users[4], Users[5]],
        messages: [
            {
                user: Users[3],
                id: 0,
                content: 'Anyone do the hw?',
                contentType: 'a message',
                timestamp: new Date(2022, 9, 13),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[4],
                id: 1,
                content: 'Anyone do the hw?',
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[4],
                id: 2,
                content: 'notes',
                contentType: 'notes',

                timestamp: new Date(2022, 9, 13),
                icon: assets.notes,
                status: 'recieved'

            }

        ]

    },

    {
        id: 2,
        type: 'private',

        users: [Users[1]],
        messages: [
            {
                id: 4,
                user: Users[1],
                content: Notes[0],
                contentType: 'notes',
                timestamp: new Date(2022, 9, 13, 15),
                status: 'sent'
            },
            {
                id: 3,
                user: Users[1],
                content: "Yeah one sec",
                contentType: 'message',
                timestamp: new Date(2022, 9, 13, 15),
                status: 'sent'
            },
            {
                id: 2,
                user: Users[5],
                content: "Studying for this exam... you have the notes?",
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                status: 'sent'
            },


            {
                id: 1,
                user: Users[1],
                content: "Hey, what's up",
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                status: 'sent'
            },




            {
                id: 0,
                user: Users[5],
                content: 'Hey',
                contentType: 'message',
                timestamp: new Date(2022, 9, 12),
                status: 'sent'
            },




        ]

    },

    {
        id: 3,
        users: [Users[3]],
        type: 'private',

        messages: [
            {
                id: 0,
                user: Users[5],
                content: 'Hey',
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                status: 'sent'
            },
            {
                id: 1,
                user: Users[3],
                content: "Hey, what's up",
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                status: 'sent'
            },

            {
                id: 2,
                user: Users[5],
                content: "Studying for this exam... you have the notes?",
                contentType: 'message',
                timestamp: new Date(2022, 9, 13),
                status: 'sent'
            },

            {
                id: 3,
                user: Users[3],
                content: "Yeah one sec",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },
            {
                id: 4,
                user: Users[3],
                content: Notes[5],
                contentType: 'notes',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            }

        ]

    },
]