import {Image, StyleProp, ImageStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import images, {IImages} from '../../assets';

interface IconProps {
  style?: StyleProp<ImageStyle>;
  size?: number;
  icon: keyof IImages;
  onPress?: () => void;
  testID?: string;
}

export const Icon: React.FC<IconProps> = ({
  style,
  size,
  icon,
  onPress,
  testID,
}) => {
  const iconComponent = (
    <Image source={images[icon]} style={[style, {height: size, width: size}]} />
  );

  if (onPress) {
    return (
      <TouchableOpacity hitSlop={12} testID={testID} onPress={onPress}>
        {iconComponent}
      </TouchableOpacity>
    );
  }
  return <>{iconComponent}</>;
};
