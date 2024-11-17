import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import IconProps from './IconProps';

const LocationIcon = ({size, color}: IconProps) => (
  <Icon name="location-pin" size={size ?? 16} color={color ?? 'white'} />
);

export default LocationIcon;
