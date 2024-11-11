import {
    SimpleImageSlider,
    SimpleImageSliderThemeProvider,
  } from "@one-am/react-native-simple-image-slider";
  import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
  import Text from "../Typography/Text";
  
  interface PageCounterProps {
    currentPage: number;
    totalPages: number;
    style?: any;
  }
  
  const PageCounter = ({ currentPage, totalPages, style }: PageCounterProps) => {
    return (
      <View
        style={{
          backgroundColor: "white",
          ...style,
          padding: 4,
          borderRadius: 4,
          position: "absolute",
          bottom: 30,
          left: 16,
        }}
      >
        <Text fontSize={12} useThemeColor fontWeight={"bold"}>
          {`${currentPage} de ${totalPages}`}
        </Text>
      </View>
    );
  };
  
  interface ImageSliderProps {
    images: { uri: string }[];
    fullScreenEnabled?: boolean;
    imageBorderRadius?: number;
  }
  
  const ImageSlider = ({
    images,
    fullScreenEnabled = true,
    imageBorderRadius,
  }: ImageSliderProps) => {
    const styles = StyleSheet.create({
      hotelImage: {
        borderRadius: imageBorderRadius ?? 8,
        resizeMode: "cover",
      },
    });
  
    return (
      <SimpleImageSliderThemeProvider>
        <SimpleImageSlider
          data={images.map((x, i) => ({ source: x, key: i.toString() }))}
          fullScreenEnabled={fullScreenEnabled}
          imageStyle={styles.hotelImage}
          PageCounterComponent={(props) => (
            <PageCounter currentPage={props.currentPage} totalPages={props.totalPages} style={props.style} />
          )}
        />
      </SimpleImageSliderThemeProvider>
    );
  };
  
  export default ImageSlider;
  