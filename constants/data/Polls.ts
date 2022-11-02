import PollOptions from "./PollOptions";
import Users from "./Users";

export default [

    {
        id: 'String',
        title: 'How much did you study for the test',
        user: Users[0],
        options: [PollOptions[0], PollOptions[1], PollOptions[3]],

        timestamp: new Date(2022, 10, 11)
    }
]