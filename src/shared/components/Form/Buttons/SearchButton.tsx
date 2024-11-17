import React from 'react';
import BaseButton from './BaseButton';
import Text from '../../Typography/Text';
import SearchIcon from '../../Icons/SearchIcon';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({onClick}) => {
  return (
    <BaseButton accessoryLeft={<SearchIcon />} onPress={onClick}>
      <Text color="white">Buscar</Text>
    </BaseButton>
  );
};

export default SearchButton;
