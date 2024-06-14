import {Alert, Linking} from 'react-native';

export const openAppSettings = () => {
  Alert.alert(
    'Permission Needed',
    'You have selected "Don\'t Allow" for contacts permission. Please enable the permission from settings.',
    [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Open Settings',
        onPress: () => {
          Linking.openSettings();
        },
      },
    ],
  );
};
