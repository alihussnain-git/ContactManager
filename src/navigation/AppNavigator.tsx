import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './types';
import {AddContactScreen, EditContactScreen, HomeScreen} from '../screens';
import {NavigationRoutes} from './routes';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={NavigationRoutes.Home}>
        <Stack.Screen
          name={NavigationRoutes.Home}
          component={HomeScreen}
          options={{title: 'Contacts'}}
        />
        <Stack.Screen
          name={NavigationRoutes.AddContact}
          component={AddContactScreen}
          options={{title: 'Add Contact'}}
        />
        <Stack.Screen
          name={NavigationRoutes.EditContact}
          component={EditContactScreen}
          options={{title: 'Edit Contact'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
