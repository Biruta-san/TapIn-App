import React from 'react';
import {Button, ButtonProps, Spinner} from '@ui-kitten/components';
import {StyleSheet, StyleProp, ViewStyle, DimensionValue} from 'react-native';
import {retrieveColorString} from '../../../utils/enums/styleEnums';

// Define props interface
interface BaseButtonProps extends ButtonProps {
  onPress: () => void;
  // children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  loading?: boolean;
  width?: DimensionValue;
  w?: DimensionValue;
  // accessoryLeft?: ReactNode;
  // accessoryRight?: ReactNode;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  onPress,
  children,
  style,
  disabled = false,
  loading = false,
  width,
  w,
  accessoryLeft,
  accessoryRight,
  ...props
}) => {
  const defaultStyle = StyleSheet.create({
    button: {
      borderRadius: 10,
      marginTop: 20,
      backgroundColor: retrieveColorString(),
      borderColor: 'transparent',
      width: width ?? w ?? '80%',
    },
    buttonContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    spinner: {
      backgroundColor: 'white',
    },
  });

  return (
    <Button
      onPress={onPress}
      style={[defaultStyle.button, style]}
      disabled={disabled}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
      {...props}>
      {!loading ? <>{children}</> : <Spinner style={defaultStyle.spinner} />}
    </Button>
  );
};

export default BaseButton;