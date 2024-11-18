import ImageSlider from '@coder-shubh/react-native-image-slider';
import React from 'react';
import {StyleSheet} from 'react-native';

interface SliderProps {
  images: string[];
}

const Slider = ({images}: SliderProps) => {
  return (
    <ImageSlider
      images={images}
      imageHeight={250}
      dotSize={10}
      dotColor="silver"
      activeDotColor="silver"
      showNavigationButtons={false}
      showIndicatorDots={true}
      imageLabel={false}
      extrapolate="clamp"
      autoSlideInterval={10000}
      containerStyle={styles.container}
      radius={5}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});

export default Slider;
