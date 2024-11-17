import {StyleSheet, Text as RText} from 'react-native';
import {
  retrieveColorString,
  StyleType,
  Weight,
} from '../../utils/enums/styleEnums';
import React from 'react';

interface TextProps {
  children: string;
  category?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  color?: string;
  useThemeColor?: boolean;
  styleType?: StyleType;
  weigth?: Weight;
  style?: object;
  fontSize?: number;
  fontWeight?: 'bold' | 'normal';
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

const Text = ({
  children,
  category,
  color,
  useThemeColor = false,
  styleType,
  weigth,
  style,
  fontSize,
  fontWeight,
  mt,
  mb,
  mr,
  ml,
}: TextProps) => {
  const getSize = () => {
    switch (category) {
      case 'h1':
        return 34;
      case 'h2':
        return 32;
      case 'h3':
        return 30;
      case 'h4':
        return 28;
      case 'h5':
        return 24;
      case 'h6':
        return 20;
      default:
        return 16;
    }
  };
  const getWeight = () => {
    switch (category) {
      case 'h1':
      case 'h2':
      case 'h3':
        return 'bold';
      case 'h4':
      case 'h5':
      case 'h6':
        return 'normal';
      default:
        return 'normal';
    }
  };

  const styles = StyleSheet.create({
    text: {
      color: useThemeColor
        ? retrieveColorString(styleType, weigth)
        : color ?? '#202020',
      fontSize: fontSize ?? getSize(),
      fontWeight: fontWeight ?? getWeight(),
      marginTop: mt ?? 0,
      marginBottom: mb ?? 0,
      marginRight: mr ?? 0,
      marginLeft: ml ?? 0,
    },
  });

  return <RText style={style ?? styles.text}>{children}</RText>;
};

export default Text;
