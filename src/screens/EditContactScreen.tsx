import React, {useState} from 'react';
import {updateContact} from '../store/slices/contactsSlice';
import {Contact} from 'react-native-contacts';
import {
  EditContactScreenNavigationProp,
  EditContactScreenRouteProp,
} from '../navigation/types';
import {useAppDispatch} from '../store/hooks';
import {ContactForm} from './homeScreen/components/ContactForm';

interface EditContactScreenProps {
  navigation: EditContactScreenNavigationProp;
  route: EditContactScreenRouteProp;
}

export const EditContactScreen = ({
  route,
  navigation,
}: EditContactScreenProps) => {
  const dispatch = useAppDispatch();

  const {contact} = route.params;
  const [name, setName] = useState(
    contact.displayName || `${contact.givenName} ${contact.familyName}`,
  );
  const [email, setEmail] = useState(contact.emailAddresses[0]?.email || '');
  const [phone, setPhone] = useState(contact.phoneNumbers[0]?.number || '');

  const saveContact = () => {
    const updatedContact: Contact = {
      ...contact,
      displayName: name.trim(),
      emailAddresses: [{label: 'home', email: email.trim()}],
      phoneNumbers: [{label: 'mobile', number: phone.trim()}],
    };

    dispatch(updateContact(updatedContact));
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
      submitButtonText="Update Contact"
    />
  );
};
