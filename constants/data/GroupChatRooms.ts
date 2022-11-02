import assets from "../assets";
import Users from "./Users";

export default [
    {
        id: 3,
        name: 'Group Project😪',
        users: [Users[0], Users[1], Users[5]],
        messages: [
            {
                user: Users[0],

                id: 0,
                content: "where are we meeting?",
                contentType: 'message',
                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[1],

                id: 1,
                content: "room 32B during lunch sound good?",
                contentType: 'message',
                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[0],

                id: 2,
                content: "sounds good",
                contentType: 'message',
                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },
            {
                user: Users[5],

                id: 3,
                content: "yeah perfect!",
                contentType: 'message',
                timestamp: new Date(2022, 9, 14),
                icon: assets.chat,
                status: 'sent'


            },

        ]
    }
]