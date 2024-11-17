import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import IconProps from './IconProps';

const VisibleIcon = ({size, color}: IconProps) => (
  <Icon name="visibility" size={size ?? 16} color={color ?? 'white'} />
);

export default VisibleIcon;
