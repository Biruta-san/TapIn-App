import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';

// Define props interface
interface CardProps {
  children: ReactNode;
}

const Card: React.FC<CardProps> = ({children}) => {
  return <View style={styles.hotelCard}>{children}</View>;
};

const styles = StyleSheet.create({
  hotelCard: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 5,
  },
});

export default Card;
