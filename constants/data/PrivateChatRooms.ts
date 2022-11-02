import Notes from "./Notes";
import Users from "./Users";

export default [

    {
        id: 0,
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
        id: 1,
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
    {
        id: 2,
        users: [Users[4]],
        type: 'private',

        messages: [
            {
                id: 0,
                user: Users[5],
                content: 'Hey',
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },
            {
                id: 1,
                user: Users[4],
                content: "Hey, what's up",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },

            {
                id: 2,
                user: Users[5],
                content: "Studying for this exam... you have the notes?",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },

            {
                id: 3,
                user: Users[4],
                content: "Yeah one sec",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },
            {
                id: 4,
                user: Users[4],
                content: Notes[0],
                contentType: 'notes',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            }

        ]

    },

    {
        id: 3,
        users: [Users[1]],
        type: 'private',

        messages: [
            {
                id: 0,
                user: Users[5],
                content: 'Hey',
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },
            {
                id: 1,
                user: Users[5],
                content: "Hey, what's up",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },

            {
                id: 2,
                user: Users[1],
                content: "Studying for this exam... you have the notes?",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },

            {
                id: 3,
                user: Users[5],
                content: "Yeah one sec",
                contentType: 'message',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            },
            {
                id: 4,
                user: Users[1],
                content: Notes[0],
                contentType: 'notes',
                timestamp: new Date(2022, 11, 13),
                status: 'sent'
            }

        ]

    },



]