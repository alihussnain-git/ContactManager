import React, {forwardRef} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  KeyboardTypeOptions,
} from 'react-native';

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  type: 'name' | 'email' | 'phone';
}

const inputTypeMap: Record<CustomTextInputProps['type'], KeyboardTypeOptions> =
  {
    email: 'email-address',
    phone: 'phone-pad',
    name: 'default',
  };

export const CustomTextInput = forwardRef<TextInput, CustomTextInputProps>(
  (
    {placeholder, value, onChangeText, type, onSubmitEditing, returnKeyType},
    ref,
  ) => {
    const keyboardType = inputTypeMap[type];

    return (
      <View style={styles.container}>
        <Text style={styles.label}>{placeholder}</Text>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          ref={ref}
          onSubmitEditing={onSubmitEditing}
          returnKeyType={returnKeyType}
        />
      </View>
    );
  },
);

CustomTextInput.displayName = 'CustomTextInput';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: 'black',
  },
});
