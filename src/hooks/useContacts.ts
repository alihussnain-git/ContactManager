import {useState, useCallback, useMemo} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';
import {RootState} from '../store';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {setContacts} from '../store/slices/contactsSlice';
import {openAppSettings, requestContactsPermission} from '../utils';

export const useContacts = () => {
  const dispatch = useAppDispatch();
  const [permissionDenied, setPermissionDenied] = useState(false);
  const {contacts: data} = useAppSelector((state: RootState) => state.contacts);
  const contacts = useMemo(() => Object.values(data), [data]);

  const handlePermissionGranted = useCallback(async () => {
    const newContacts = await Contacts.getAll();
    const existingRecordIDs = new Set(
      contacts.map(contact => contact.recordID),
    );

    const uniqueNewContacts = newContacts.filter(
      newContact => !existingRecordIDs.has(newContact.recordID),
    );

    if (uniqueNewContacts.length) {
      dispatch(setContacts([...contacts, ...uniqueNewContacts]));
    } else if (contacts.length === 0) {
      dispatch(setContacts(newContacts));
    }
    setPermissionDenied(false);
  }, [contacts, dispatch]);

  const handlePermissionDenied = (permission: string | null) => {
    if (
      permission === PermissionsAndroid.RESULTS.DENIED &&
      Platform.OS === 'android'
    ) {
      setPermissionDenied(true);
    } else if (
      permission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ||
      permission === 'denied'
    ) {
      openAppSettings();
      setPermissionDenied(true);
    }
  };

  const syncContacts = useCallback(async () => {
    try {
      const permission = await requestContactsPermission();
      if (
        permission === PermissionsAndroid.RESULTS.GRANTED ||
        permission === 'authorized'
      ) {
        await handlePermissionGranted();
      } else {
        handlePermissionDenied(permission);
      }
    } catch (error) {
      setPermissionDenied(true);
    }
  }, [handlePermissionGranted]);

  return {contacts, permissionDenied, syncContacts};
};
