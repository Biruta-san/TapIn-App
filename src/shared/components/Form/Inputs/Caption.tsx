import React from 'react';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';

interface CaptionProps {
  helperText?: string;
}

const Caption: React.FC<CaptionProps> = ({helperText}) => {
  const styles = StyleSheet.create({
    text: {
      color: 'black',
      fontSize: 12,
      opacity: 0.8,
    },
  });

  return helperText && <Text style={styles.text}>{helperText}</Text>;
};

export default Caption;
