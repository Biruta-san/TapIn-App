import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import IconProps from './IconProps';

const NoVisibleIcon = ({size, color}: IconProps) => (
  <Icon name="visibility-off" size={size ?? 16} color={color ?? 'white'} />
);

export default NoVisibleIcon;
