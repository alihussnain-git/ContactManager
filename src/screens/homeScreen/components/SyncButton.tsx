// components/SyncButton.tsx

import React from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {Icon} from '../../../components';

interface SyncButtonProps {
  onPress: () => void;
}

export const SyncButton: React.FC<SyncButtonProps> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <Icon
        testID="sync-button"
        icon="sync"
        size={Platform.select({android: 22, ios: 18})}
        onPress={onPress}
      />
      <Text style={styles.text}>Sync</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    marginEnd: 16,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },
});
