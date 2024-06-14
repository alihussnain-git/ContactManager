import {combineReducers} from '@reduxjs/toolkit';
import contactsReducer from './slices/contactsSlice';

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

export default rootReducer;
