import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

interface EmptyScreenProps {
  title: string;
  CTATitle?: string;
  onPressCTA?: () => void;
}

export const EmptyScreen: React.FC<EmptyScreenProps> = ({
  title,
  CTATitle = 'Try Again',
  onPressCTA,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Button title={CTATitle} onPress={onPressCTA} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 16,
    color: 'black',
  },
});
