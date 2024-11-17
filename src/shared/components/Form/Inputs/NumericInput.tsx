import React from 'react';
import {Input as KInput} from '@ui-kitten/components';
import Caption from './Caption';
import {DimensionValue, StyleSheet} from 'react-native';

// Define the props interface for the NumericInput component
interface NumericInputProps {
  value?: string;
  label?: string;
  helperText?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  style?: object;
  marginTop?: number;
  w?: DimensionValue;
  width?: DimensionValue;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  label,
  helperText,
  placeholder,
  onChange,
  style,
  marginTop,
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

  const handleChange = (text: string) => {
    // Only keep numeric values
    const numericValue = text.replace(/[^0-9]/g, '');
    onChange(numericValue);
  };

  return (
    <KInput
      value={value}
      label={label}
      style={style ?? styles.container}
      caption={<Caption helperText={helperText} />}
      placeholder={placeholder}
      onChangeText={handleChange}
      keyboardType="numeric"
    />
  );
};

export default NumericInput;
