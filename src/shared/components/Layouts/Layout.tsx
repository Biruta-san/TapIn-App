import {Layout as KLayout} from '@ui-kitten/components';
import {StyleSheet, ViewStyle} from 'react-native';
import {
  retrieveColorString,
  StyleType,
  Weight,
} from '../../utils/enums/styleEnums';
import React, {ReactNode} from 'react';

interface LayoutProps {
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  styleType?: StyleType;
  weigth?: Weight;
  bg?: string;
  borderRadius?: number;
  style?: ViewStyle;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexDir?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  paddingTop?: number;
  pt?: number;
  padding?: number;
  p?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  gap?: number;
  mt?: number;
}

const Layout = ({
  children,
  width,
  height,
  styleType,
  weigth,
  bg,
  borderRadius,
  style,
  flex,
  flexDirection,
  flexDir,
  paddingTop,
  pt,
  padding,
  p,
  alignItems,
  justifyContent,
  borderTopLeftRadius,
  borderTopRightRadius,
  gap,
  mt,
}: LayoutProps) => {
  const styles = StyleSheet.create({
    container: {
      flex: flex || 1,
      flexDirection: flexDirection || flexDir || 'column',
      justifyContent: justifyContent || 'center',
      alignItems: alignItems || 'center',
      backgroundColor: bg || retrieveColorString(styleType, weigth),
      height: height || '100%',
      width: width || '100%',
      borderRadius: borderRadius || 0,
      borderTopLeftRadius: borderTopLeftRadius || 0,
      borderTopRightRadius: borderTopRightRadius || 0,
      padding: padding || p || 0,
      paddingTop: paddingTop || pt || 0,
      gap: gap || 0,
      mt: mt ?? 0,
    } as ViewStyle,
  });

  return <KLayout style={[styles.container, style]}>{children}</KLayout>;
};

export default Layout;
