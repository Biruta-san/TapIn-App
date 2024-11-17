import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import IconProps from './IconProps';

const CloseIcon = ({size, color}: IconProps) => (
  <Icon name="close" size={size ?? 16} color={color ?? 'white'} />
);

export default CloseIcon;
