import {
  SimpleImageSlider,
  SimpleImageSliderThemeProvider,
} from '@one-am/react-native-simple-image-slider';
import {StyleSheet, View} from 'react-native';
import Text from '../Typography/Text';
import React from 'react';

interface PageCounterProps {
  currentPage: number;
  totalPages: number;
  style?: any;
}

const styles = StyleSheet.create({
  pageCounter: {
    backgroundColor: 'white',
    padding: 4,
    borderRadius: 4,
    position: 'absolute',
    bottom: 30,
    left: 16,
  },
});

const PageCounter = ({currentPage, totalPages, style}: PageCounterProps) => {
  return (
    <View style={[styles.pageCounter, ...style]}>
      <Text fontSize={12} useThemeColor fontWeight={'bold'}>
        {`${currentPage} de ${totalPages}`}
      </Text>
    </View>
  );
};

interface ImageSliderProps {
  images: string[];
  fullScreenEnabled?: boolean;
  imageBorderRadius?: number;
}

const ImageSlider = ({
  images,
  fullScreenEnabled = true,
  imageBorderRadius,
}: ImageSliderProps) => {
  const sliderStyles = StyleSheet.create({
    hotelImage: {
      borderRadius: imageBorderRadius ?? 8,
      resizeMode: 'cover',
    },
  });

  return (
    <SimpleImageSliderThemeProvider>
      <SimpleImageSlider
        data={images.map((x, i) => ({source: x, key: i.toString()}))}
        fullScreenEnabled={fullScreenEnabled}
        imageStyle={sliderStyles.hotelImage}
        PageCounterComponent={PageCounter}
      />
    </SimpleImageSliderThemeProvider>
  );
};

export default ImageSlider;
