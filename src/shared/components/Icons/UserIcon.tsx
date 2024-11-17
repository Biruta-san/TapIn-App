import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import IconProps from './IconProps';

const UserIcon = ({size, color}: IconProps) => (
  <Icon name="user" size={size ?? 16} color={color ?? 'white'} />
);

export default UserIcon;
