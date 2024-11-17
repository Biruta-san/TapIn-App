import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

interface ImageType {
  id: number;
  url: string;
}

const images: ImageType[] = [
  {
    id: 1,
    url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
  },
  {
    id: 2,
    url: 'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  },
];

const OnBoardingItem = ({item}: any) => {
  return <Image source={{uri: item.url}} style={styles.image} />;
};

const Slider = () => {
  //   const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={images}
        style={styles.list}
        pagingEnabled
        horizontal
        // onMomentumScrollEnd={e => {
        //   setActiveIndex(Math.floor(e.nativeEvent.contentOffset.x / width));
        // }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={item => <OnBoardingItem item={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: '100%',
  },
  list: {
    maxHeight: width,
  },
});

export default Slider;
