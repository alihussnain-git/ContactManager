import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {AddContactScreen} from './AddContactScreen';
import {addContact} from '../store/slices/contactsSlice';

jest.mock('../store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('../store/slices/contactsSlice', () => ({
  addContact: jest.fn(),
}));

const navigation = {
  goBack: jest.fn(),
};

describe('AddContactScreen', () => {
  test('renders correctly', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AddContactScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    expect(getByText('Save Contact')).toBeTruthy();
  });

  test('updates state on input change', () => {
    const {getByText} = render(
      <NavigationContainer>
        <AddContactScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByText('Name'), 'John Doe');
    fireEvent.changeText(getByText('Email'), 'john@example.com');
    fireEvent.changeText(getByText('Phone'), '1234567890');
  });

  test('calls saveContact on form submission', async () => {
    const {getByText, getByPlaceholderText} = render(
      <NavigationContainer>
        <AddContactScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    fireEvent.changeText(getByPlaceholderText('Name'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Email'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Phone'), '1234567890');

    expect(getByPlaceholderText('Name').props.value).toBe('John Doe');
    expect(getByPlaceholderText('Email').props.value).toBe('john@example.com');
    expect(getByPlaceholderText('Phone').props.value).toBe('1234567890');

    fireEvent.press(getByText('Save Contact'));

    await waitFor(() => {
      expect(addContact).toHaveBeenCalledWith({
        displayName: 'John Doe',
        emailAddresses: [{label: 'home', email: 'john@example.com'}],
        phoneNumbers: [{label: 'mobile', number: '1234567890'}],
        recordID: expect.any(String),
      });

      expect(navigation.goBack).toHaveBeenCalled();
    });
  });
});
