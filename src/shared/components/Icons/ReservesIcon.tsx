import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import IconProps from './IconProps';

const ReservesIcon = ({size, color}: IconProps) => (
  <Icon name="ticket" size={size ?? 16} color={color ?? 'white'} />
);

export default ReservesIcon;
