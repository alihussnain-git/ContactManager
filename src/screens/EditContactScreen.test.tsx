import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {updateContact} from '../store/slices/contactsSlice';
import {EditContactScreen} from './EditContactScreen';

jest.mock('../store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../store/slices/contactsSlice', () => ({
  updateContact: jest.fn(),
}));

const contact = {
  displayName: 'Jane Doe',
  givenName: 'Jane',
  familyName: 'Doe',
  emailAddresses: [{label: 'home', email: 'jane@example.com'}],
  phoneNumbers: [{label: 'mobile', number: '0987654321'}],
};

const navigation = {
  goBack: jest.fn(),
};

const route = {
  params: {
    contact,
  },
};

describe('EditContactScreen', () => {
  test('renders correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <EditContactScreen
          navigation={navigation as any}
          route={route as any}
        />
      </NavigationContainer>,
    );

    expect(getByText('Update Contact')).toBeTruthy();
  });

  test('pre-fills the form with contact data', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <EditContactScreen
          navigation={navigation as any}
          route={route as any}
        />
      </NavigationContainer>,
    );

    expect(getByPlaceholderText('Name').props.value).toBe('Jane Doe');
    expect(getByPlaceholderText('Email').props.value).toBe('jane@example.com');
    expect(getByPlaceholderText('Phone').props.value).toBe('0987654321');
  });

  test('updates state on input change', () => {
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <EditContactScreen
          navigation={navigation as any}
          route={route as any}
        />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Phone'), '1234567890');

    expect(getByPlaceholderText('Name').props.value).toBe('John Doe');
    expect(getByPlaceholderText('Email').props.value).toBe('john@example.com');
    expect(getByPlaceholderText('Phone').props.value).toBe('1234567890');
  });

  test('calls updateContact on form submission', async () => {
    const {getByPlaceholderText, getByText} = render(
      <NavigationContainer>
        <EditContactScreen
          navigation={navigation as any}
          route={route as any}
        />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Phone'), '1234567890');

    fireEvent.press(getByText('Update Contact'));

    await waitFor(() => {
      expect(updateContact).toHaveBeenCalledWith({
        ...contact,
        displayName: 'John Doe',
        emailAddresses: [{label: 'home', email: 'john@example.com'}],
        phoneNumbers: [{label: 'mobile', number: '1234567890'}],
      });

      expect(navigation.goBack).toHaveBeenCalled();
    });
  });
});
