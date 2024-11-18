declare module '@coder-shubh/react-native-image-slider' {
  import React from 'react';
  import {StyleProp, ViewStyle} from 'react-native';

  type ExtrapolateType = 'clamp' | 'extend' | 'identity';

  export interface ImageSliderProps {
    images: string[];
    imageHeight?: number;
    dotSize?: number;
    dotColor?: string;
    activeDotColor?: string;
    showNavigationButtons?: boolean;
    showIndicatorDots?: boolean;
    imageLabel?: boolean;
    label?: string;
    extrapolate?: ExtrapolateType;
    autoSlideInterval?: number;
    containerStyle?: StyleProp<ViewStyle>;
    radius?: number;
    testID?: string;
  }

  const ImageSlider: React.FC<ImageSliderProps>;

  export default ImageSlider;
}
