import React, {useState} from 'react';
import {Input as KInput} from '@ui-kitten/components';
import Caption from './Caption';
import {DimensionValue, StyleSheet} from 'react-native';
import {retrieveColorString} from '../../../utils/enums/styleEnums';
import VisibleIcon from '../../Icons/VisibleIcon';
import NoVisibleIcon from '../../Icons/NoVisibleIcon';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';

// Define the props interface for the Input component
interface InputProps {
  value?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  onChange: (text: string) => void;
  style?: object;
  marginTop?: number;
  isPassword?: boolean;
  w?: DimensionValue;
  width?: DimensionValue;
}

interface PasswordIconProps {
  isPassword?: boolean;
  passwordVisible?: boolean;
  handleVisibilityChange?: () => void;
}

const PasswordIcon = ({
  isPassword,
  passwordVisible,
  handleVisibilityChange,
}: PasswordIconProps) => {
  return (
    isPassword && (
      <TouchableWithoutFeedback onPress={handleVisibilityChange}>
        {passwordVisible ? (
          <VisibleIcon size={20} color={retrieveColorString()} />
        ) : (
          <NoVisibleIcon size={20} color={retrieveColorString()} />
        )}
      </TouchableWithoutFeedback>
    )
  );
};

const Input: React.FC<InputProps> = ({
  value,
  label,
  helperText,
  placeholder,
  onChange,
  style,
  marginTop,
  isPassword,
  w,
  width,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: w ?? width ?? '80%',
      borderRadius: 10,
      marginTop: marginTop ?? 0,
    },
  });

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleVisibilityChange = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <KInput
      value={value}
      label={label}
      style={style ?? styles.container}
      caption={<Caption helperText={helperText} />}
      placeholder={placeholder}
      onChangeText={onChange}
      secureTextEntry={!passwordVisible && isPassword}
      accessoryRight={
        <PasswordIcon
          isPassword={isPassword}
          passwordVisible={passwordVisible}
          handleVisibilityChange={handleVisibilityChange}
        />
      }
    />
  );
};

export default Input;
