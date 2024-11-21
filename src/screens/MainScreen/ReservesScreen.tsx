import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import Text from '../../shared/components/Typography/Text';
import {generateUserReservesList} from '../../shared/utils/mocks/hotel';
import Layout from '../../shared/components/Layouts/Layout';
import Card from '../../shared/components/Cards/Card';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {getLocaleDateString} from '../../shared/utils/dateUtils';
import {
  retrieveColorString,
  styleTypeEnums,
  weightEnums,
} from '../../shared/utils/enums/styleEnums';
import ImageSlider from '../../shared/components/Media/ImageSlider/ImageSlider';
import {UsuarioAgendamento} from '../../shared/interfaces/usuario';

type RootStackParamList = {
  Checkin: undefined;
};

interface ReservesScreenProps {
  route?: any;
}

const ReservesScreen: React.FC<ReservesScreenProps> = () => {
  const [listAgendamentos, setListAgendamentos] = useState<
    UsuarioAgendamento[]
  >([]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    handleSearchAgendamentos();
  }, []);

  const handleSearchAgendamentos = () => {
    setListAgendamentos(generateUserReservesList(10));
  };

  const fotos: string[] = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
    'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  ];

  const renderItem: ListRenderItem<UsuarioAgendamento> = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Checkin');
        }}>
        <Card>
          <View style={styles.imageView}>
            <ImageSlider
              images={fotos}
              imageHeight={250}
              dotSize={10}
              dotColor={retrieveColorString(
                styleTypeEnums.PRIMARY,
                weightEnums[700],
              )}
              activeDotColor={retrieveColorString(
                styleTypeEnums.PRIMARY,
                weightEnums[700],
              )}
              showNavigationButtons={false}
              showIndicatorDots={true}
              imageLabel={false}
              extrapolate="clamp"
              autoSlideInterval={10000}
              radius={5}
            />
          </View>
          <View style={styles.hotelInfo}>
            <Text fontWeight="bold" fontSize={16}>
              {item.hotelNome}
            </Text>
            <Text fontSize={14}>{`${item.hotelEndereco}`}</Text>
            <Text fontSize={14}>{`Quarto: ${item.hotelQuartoNumero}`}</Text>
            <Text useThemeColor fontSize={16} fontWeight="bold">
              {`De: ${getLocaleDateString(
                item.checkIn,
              )} - Até: ${getLocaleDateString(item.checkOut)}`}
            </Text>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Layout flex={1} bg={'white'}>
      <Layout flex={1} bg={'white'} paddingTop={10}>
        <Text mt={10} category={'h4'} useThemeColor fontWeight="bold">
          Reservas
        </Text>
        <View style={styles.listView}>
          <FlatList
            data={listAgendamentos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  hotelInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hotelPrice: {
    color: retrieveColorString(),
    fontWeight: 'bold',
    fontSize: 14,
  },
  hotelLocation: {
    color: '#555',
    fontSize: 14,
  },
  imageView: {
    width: '100%',
    alignSelf: 'center',
    marginRight: 20,
    marginLeft: 5,
    marginBottom: 10,
  },
});

export default ReservesScreen;
