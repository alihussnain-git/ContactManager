import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Contact} from 'react-native-contacts';

type ContactRecords = Record<string, Contact>;

interface ContactsState {
  contacts: ContactRecords;
}

const initialState: ContactsState = {
  contacts: {},
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setContacts(state, action: PayloadAction<Contact[]>) {
      state.contacts = Object.fromEntries(
        action.payload.map(contact => [contact.recordID, contact]),
      );
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts[action.payload.recordID] = action.payload;
    },
    updateContact(state, action: PayloadAction<Contact>) {
      const {recordID} = action.payload;
      if (state.contacts[recordID]) {
        state.contacts[recordID] = action.payload;
      }
    },
  },
});

export const {setContacts, addContact, updateContact} = contactsSlice.actions;
export default contactsSlice.reducer;
