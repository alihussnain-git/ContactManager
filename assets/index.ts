import {ImageSourcePropType} from 'react-native';

const images = {
  add: require('./plus.png'),
  sync: require('./sync_icon.png'),
};

type ImageSrc = ImageSourcePropType;

export interface IImages {
  add: ImageSrc;
  sync: ImageSrc;
}

export default images as IImages;
