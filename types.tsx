/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  Modal: undefined;
  ClassChatRoom: undefined;
  Chat: undefined;
  GroupChat: undefined;


};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type BottomTabParamList = {
  Home: undefined;
  Playground: undefined;
  Desk: undefined;
  Chat: undefined;
  ClassChatRoom: undefined;
  GroupChat: undefined;

  Classes: undefined;


};
export type School = {
  id: Int32,
  name: string,
  type: string,
  location: string
  users: User[],
  active: User[]
}


export type TopTabParamList = {
  Classes: undefined;
  Announcements: undefined;
  Classmates: undefined;
  Calendar: undefined;
  GroupChat: undefined;


};



export type HomeParamList = {
  HomeScreen: undefined
}

export type User = {
  id: Int32;
  firstName: String;
  lastName: String;
  username: String;
  studyBuddy: boolean;
  story: String[];
  images: String[];
  class: String

}

export type ChatRoom = {
  id: Int32;
  users: User[];
  messages: Message[];
  type: String;

}



export type Class = {
  id: String;
  users: [User];
  name: String;
  chatRooms: ChatRooms;
  announcements: Announcement[];
  image: String

}
export type ChatRooms = {
  classChatRooms: ChatRoom[];
  groupChatRooms: ChatRoom[];
  privateChatRooms: ChatRoom[];

}


export type Message = {
  user: User
  id: String;
  content: string;
  contentType: String;
  timestamp: Date;
  status: String;
  isPrivate: boolean;

}

export type Announcement = {
  id: String;
  title: string;
  dueDate: Date;
  timestamp: Date;

}

export type Notes = {
  id: String;
  title: string;
  likes: User[];
  views: User[];
  comments: User[];
  section: String;
  images: String[];
  owner: User;
  timestamp: Date;



}



export type Poll = {
  id: String;
  title: string;
  user: User;
  options: PollOption[]
  timestamp: Date;




}

export type PollOption = {
  option: String;
  votes: User[];

}



export type RootTabScreenProps<Screen extends keyof BottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
