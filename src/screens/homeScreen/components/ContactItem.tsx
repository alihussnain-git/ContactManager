import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Contact} from 'react-native-contacts';

interface ContactItemProps {
  contact: Contact;
  onPress: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({contact, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.contactName}>
        {contact.displayName || `${contact.givenName} ${contact.familyName}`}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contactName: {
    fontSize: 18,
    marginVertical: 16,
    paddingHorizontal: 16,
    fontWeight: '400',
    color: 'black',
  },
});
