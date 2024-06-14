import React, {useState} from 'react';
import {addContact} from '../store/slices/contactsSlice';
import {Contact} from 'react-native-contacts';
import {AddContactScreenNavigationProp} from '../navigation/types';
import {useAppDispatch} from '../store/hooks';
import {ContactForm} from './homeScreen/components/ContactForm';

interface AddContactScreenProps {
  navigation: AddContactScreenNavigationProp;
}

export const AddContactScreen = ({navigation}: AddContactScreenProps) => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const saveContact = () => {
    const newContact = {
      displayName: name.trim(),
      emailAddresses: [{label: 'home', email: email.trim()}],
      phoneNumbers: [{label: 'mobile', number: phone.trim()}],
      recordID: Date.now().toString(),
    };

    dispatch(addContact(newContact as Contact));
    navigation.goBack();
  };

  return (
    <ContactForm
      name={name}
      email={email}
      phone={phone}
      setName={setName}
      setEmail={setEmail}
      setPhone={setPhone}
      onSubmit={saveContact}
      submitButtonText="Save Contact"
    />
  );
};
