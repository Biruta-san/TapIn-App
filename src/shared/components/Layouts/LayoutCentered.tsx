import React, {ReactNode} from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet, ViewStyle} from 'react-native';

// Define the type for the props
interface LayoutCenteredProps {
  children: ReactNode; // Children can be any valid React node (JSX elements, strings, etc.)
}

const LayoutCentered: React.FC<LayoutCenteredProps> = ({children}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle, // Specify that this style is for a View component
  });

  return <Layout style={styles.container}>{children}</Layout>;
};

export default LayoutCentered;
