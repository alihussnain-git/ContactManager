import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Contact} from 'react-native-contacts';
import {NavigationRoutes} from './routes';

export type RootStackParamList = {
  Home: undefined;
  AddContact: undefined;
  EditContact: {contact: Contact};
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NavigationRoutes.Home
>;
export type AddContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NavigationRoutes.AddContact
>;

export type EditContactScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NavigationRoutes.EditContact
>;

export type EditContactScreenRouteProp = RouteProp<
  RootStackParamList,
  NavigationRoutes.EditContact
>;
