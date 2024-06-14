import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {HomeScreen} from './HomeScreen';
import {useContacts} from '../../hooks/useContacts';
import {NavigationContainer} from '@react-navigation/native';
import {Contact} from 'react-native-contacts';

const mockedContacts: Contact[] = [
  {
    recordID: '1',
    backTitle: 'Back Title 1',
    company: 'Company 1',
    emailAddresses: [{label: 'work', email: 'john.doe@example.com'}],
    displayName: 'John Doe',
    familyName: 'Doe',
    givenName: 'John',
    middleName: 'Middle 1',
    jobTitle: 'Job Title 1',
    phoneNumbers: [{label: 'mobile', number: '123-456-7890'}],
    hasThumbnail: true,
    thumbnailPath: '/path/to/thumbnail1.jpg',
    isStarred: false,
    postalAddresses: [],
    prefix: '',
    suffix: '',
    department: 'Department 1',
    birthday: {year: 1990, month: 1, day: 1},
    imAddresses: [],
    urlAddresses: [],
    note: 'Note 1',
  },
  {
    recordID: '2',
    backTitle: 'Back Title 2',
    company: 'Company 2',
    emailAddresses: [{label: 'home', email: 'jane.smith@example.com'}],
    displayName: 'Jane Smith',
    familyName: 'Smith',
    givenName: 'Jane',
    middleName: 'Middle 2',
    jobTitle: 'Job Title 2',
    phoneNumbers: [{label: 'work', number: '987-654-3210'}],
    hasThumbnail: false,
    thumbnailPath: '',
    isStarred: true,
    postalAddresses: [],
    prefix: '',
    suffix: '',
    department: 'Department 2',
    birthday: {year: 1995, month: 6, day: 15},
    imAddresses: [],
    urlAddresses: [],
    note: 'Note 2',
  },
];

const navigation = {
  navigate: jest.fn(),
};

jest.mock('../../hooks/useContacts', () => ({
  useContacts: jest.fn(),
}));

const mockUseContacts = useContacts as jest.MockedFunction<typeof useContacts>;

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty screen when contacts are empty and permission is denied', () => {
    mockUseContacts.mockReturnValue({
      contacts: [],
      permissionDenied: true,
      syncContacts: jest.fn(),
    });

    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    const emptyScreenText = getByText(
      'Contact permission denied. See app settings to import contacts.',
    );
    expect(emptyScreenText).toBeDefined();
  });

  test('renders contact list when contacts are available', () => {
    mockUseContacts.mockReturnValue({
      contacts: mockedContacts,
      permissionDenied: false,
      syncContacts: jest.fn(),
    });

    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    mockedContacts.forEach(contact => {
      const contactItemText = getByText(
        `${contact.givenName} ${contact.familyName}`,
      );
      expect(contactItemText).toBeDefined();
    });
  });

  test('navigates to edit screen when a contact is pressed', () => {
    mockUseContacts.mockReturnValue({
      contacts: mockedContacts,
      permissionDenied: false,
      syncContacts: jest.fn(),
    });

    const {getByText} = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    const contactItemText = getByText('John Doe');
    fireEvent.press(contactItemText);

    expect(navigation.navigate).toHaveBeenCalledWith('EditContact', {
      contact: mockedContacts[0],
    });
  });
  test('navigates to add contact screen when FloatingActionButton is pressed', () => {
    mockUseContacts.mockReturnValue({
      contacts: [],
      permissionDenied: false,
      syncContacts: jest.fn(),
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <HomeScreen navigation={navigation as any} />
      </NavigationContainer>,
    );

    const floatingActionButton = getByTestId('floating-action-button');
    fireEvent.press(floatingActionButton);

    expect(navigation.navigate).toHaveBeenCalledWith('AddContact');
  });
});
