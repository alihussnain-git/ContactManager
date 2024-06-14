import {PermissionsAndroid, Platform} from 'react-native';
import Contacts from 'react-native-contacts';

export const requestContactsPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      return permission;
    } else {
      return await Contacts.requestPermission();
    }
  } catch (error) {
    console.error('Permission request error:', error);
    return null;
  }
};
