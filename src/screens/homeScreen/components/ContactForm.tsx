// components/ContactForm.tsx

import React, {useRef, useState} from 'react';
import {View, Button, StyleSheet, TextInput, Text} from 'react-native';
import {CustomTextInput} from '../../../components';

interface ContactFormProps {
  name: string;
  email: string;
  phone: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  onSubmit: () => void;
  submitButtonText: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  onSubmit,
  submitButtonText,
}) => {
  const emailInputRef = useRef<TextInput>(null);
  const phoneInputRef = useRef<TextInput>(null);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      setError('Name and phone number are required.');
    } else {
      setError('');
      onSubmit();
    }
  };

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        type="name"
        returnKeyType="next"
        onSubmitEditing={() => emailInputRef.current?.focus()}
      />
      <CustomTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        type="email"
        returnKeyType="next"
        onSubmitEditing={() => phoneInputRef.current?.focus()}
        ref={emailInputRef}
      />
      <CustomTextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        type="phone"
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
        ref={phoneInputRef}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={submitButtonText} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});
