import { faker } from "@faker-js/faker"

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
        id: 1,
        name: 'Annapolis High School',
        type: '',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: []


    }, {
        id: 2,
        name: 'Chesapeake Middle School',
        type: '',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: []


    }, {
        id: 3,
        name: 'Berry High School',
        type: '',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: []


    }, {
        id: 4,
        name: 'Towson University',
        type: '',
        logo: '',
        location: getRandomLocation(),
        users: [],
        active: []

    },
]