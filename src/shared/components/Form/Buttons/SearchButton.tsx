import React from 'react';
import BaseButton from './BaseButton';
import Text from '../../Typography/Text';
import SearchIcon from '../../Icons/SearchIcon';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({onClick}) => {
  return (
    <BaseButton
      accessoryLeft={<SearchIcon size={18} />}
      w={'100%'}
      onPress={onClick}>
      <Text ml={15} fontWeight="bold" color="white">
        Buscar
      </Text>
    </BaseButton>
  );
};

export default SearchButton;
