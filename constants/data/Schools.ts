import { faker } from "@faker-js/faker"
import Announcements from "./Announcements";
import ChatRooms from "./ChatRooms";
import Users from "./Users";

const getRandomLocation = () => {
    const streetAddress = faker.address.streetAddress();
    const state = faker.address.state();
    const zipCode = faker.address.zipCode();
    return streetAddress + " " +
        state + " " +
        zipCode
}

export default [



    {
        id: '0',
        name: 'Annapolis High School',
        scheduleType: 'period based',
        logo: '',
        location: getRandomLocation(),
        users: null,
        active: null,



    }, {
        id: '1',
        name: 'Chesapeake Middle School',
        scheduleType: 'block based',
        logo: '',
        location: getRandomLocation(),
        users: null,
        active: null,
    }, {
        id: '2',
        name: 'Berry High School',
        scheduleType: 'period based',
        logo: '',
        location: getRandomLocation(),
        users: null,
        active: null,


    }, {
        id: '3',
        name: 'Towson University',
        scheduleType: 'time based',
        logo: '',
        location: getRandomLocation(),
        users: null,
        active: null,

    },
]