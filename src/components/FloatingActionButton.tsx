import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {Icon} from '.';

interface FABProps {
  onPress: () => void;
}

export const FloatingActionButton: React.FC<FABProps> = ({onPress}) => {
  return (
    <TouchableOpacity
      testID="floating-action-button"
      style={styles.fab}
      onPress={onPress}>
      <Icon size={22} icon="add" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    right: 36,
    bottom: 36,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
});
