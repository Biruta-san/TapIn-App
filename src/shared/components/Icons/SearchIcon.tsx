import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import IconProps from './IconProps';

const SearchIcon = ({size, color}: IconProps) => (
  <Icon name="search" size={size ?? 16} color={color ?? 'white'} />
);

export default SearchIcon;
