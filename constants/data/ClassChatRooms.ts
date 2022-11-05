import assets from "../assets";
import Classes from "./Classes.js";
import Users from "./Users";

export default [
    {

        id: 0,
        name: 'Algeba I',
        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5]],
        messages: []

    },
    {

        id: 1,
        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5]],
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

        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5], Users[6]],
        messages: [
            {
                user: Users[7],

                id: 0,
                content: "What's up",
                contentType: 'message',

                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[4],
                id: 1,
                content: 'notes',
                contentType: 'notes',
                timestamp: new Date(2022, 9, 13),
                icon: assets.notes,
                status: 'sent'

            },

            {
                user: Users[3],
                id: 2,
                content: 'Anyone do the hw?',
                contentType: 'message',
                timestamp: new Date(2022, 9, 8),
                icon: assets.chat,
                status: 'recieved'


            }
        ]

    },

    {

        id: 3,

        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5], Users[6]],
        messages: [
            {
                user: Users[4],

                id: 0,
                content: "I have the hw",
                contentType: 'message',
                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[7],
                id: 1,
                content: 'Burning Question',
                contentType: 'Burning Question',
                timestamp: new Date(2022, 9, 13),
                icon: assets.fire,
                status: 'sent'

            },

            {
                user: Users[7],
                id: 2,
                content: 'Poll',
                contentType: 'Poll',
                timestamp: new Date(2022, 9, 13),
                icon: assets.poll,
                status: 'sent'
            }
        ]

    },
    {

        id: 4,

        users: [Users[0], Users[1], Users[2], Users[3], Users[4], Users[5], Users[6]],
        messages: [
            {
                user: Users[4],

                id: 0,
                content: "I have the hw",
                timestamp: new Date(2022, 9, 14),
                contentType: 'message',

                icon: assets.chat,
                status: 'sent'

            },
            {
                user: Users[7],
                id: 1,
                content: 'Burning Question',
                contentType: 'Burning Question',
                timestamp: new Date(2022, 9, 12),
                icon: assets.notes,
                status: 'sent'

            },

            {
                user: Users[6],
                id: 2,
                content: 'Burning Question',
                contentType: 'Burning Question',
                timestamp: new Date(2022, 9, 12),
                icon: assets.fire,
                status: 'sent'


            }
        ]

    },
]