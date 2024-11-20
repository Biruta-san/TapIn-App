import React, {useEffect, useState} from 'react';
import Layout from '../../shared/components/Layouts/Layout';
import {
  Modal,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import SearchButton from '../../shared/components/Form/Buttons/SearchButton';
import Input from '../../shared/components/Form/Inputs/Input';
import RangeDatepicker from '../../shared/components/Form/Inputs/RangeDatePicker';
import NumericInput from '../../shared/components/Form/Inputs/NumericInput';
import {generateHotelsList, Hotel} from '../../shared/utils/mocks/hotel';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Text from '../../shared/components/Typography/Text';
import Card from '../../shared/components/Cards/Card';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import CustomAccordion from '../../shared/components/Accordion/CustomAccordion';
import SearchIcon from '../../shared/components/Icons/SearchIcon';
import CloseIcon from '../../shared/components/Icons/CloseIcon';
import {
  retrieveColorString,
  styleTypeEnums,
  weightEnums,
} from '../../shared/utils/enums/styleEnums';
import ImageSlider from '../../shared/components/Media/ImageSlider/ImageSlider';

const {width} = Dimensions.get('window');
const HotelCard = ({item}: {item: Hotel}) => {
  type RootStackParamList = {
    Reservar: {hotelId: number; item: Hotel};
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const fotos: string[] = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
    'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  ];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Reservar', {hotelId: item.id, item});
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
            {item.nome}
          </Text>
          <Text fontSize={14}>
            {`${item.cidade} - ${item.endereco} - N° ${item.numero}`}
          </Text>
          <Text
            useThemeColor
            fontSize={16}
            fontWeight="bold">{`Diária: R$ ${item.valorDiaria}`}</Text>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const FindScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [onde, setOnde] = useState<string>();
  const [quando, setQuando] = useState<Record<string, any>>({});
  const [quantasPessoas, setQuantasPessoas] = useState<string>();
  const [listHoteis, setListHoteis] = useState<Hotel[]>([]);

  useEffect(() => {
    handleSearchHoteis();
  }, []);

  const handleSearchHoteis = async () => {
    setListHoteis(generateHotelsList(10));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const SECTIONS = [
    {
      title: 'Para onde?',
      content: (
        <Input
          value={onde}
          w={'100%'}
          onChange={value => setOnde(value)}
          label={'Destino da viagem'}
          placeholder={'Informe a cidade ou hotel'}
        />
      ),
    },
    {
      title: 'Quando?',
      content: (
        <RangeDatepicker
          range={quando}
          onSelect={nextRange => setQuando(nextRange)}
          label={'Período da viagem'}
          placeholder={'Selecione o período'}
        />
      ),
    },
    {
      title: 'Quantas Pessoas?',
      content: (
        <NumericInput
          value={quantasPessoas}
          onChange={value => setQuantasPessoas(value)}
          w={'100%'}
          placeholder={'Quantidade de pessoas'}
          label={'Informe a quantidade de pessoas'}
        />
      ),
    },
  ];

  return (
    <Layout flex={1} bg={'white'}>
      <Layout flex={1} bg={'white'} paddingTop={10}>
        <View style={styles.shadowView}>
          <TouchableOpacity
            style={styles.touch}
            activeOpacity={1}
            onPress={() => setModalVisible(true)}>
            <View style={styles.container}>
              <SearchIcon color={retrieveColorString()} />
              <Text>Pesquisar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.listView}>
          <FlatList
            data={listHoteis}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <HotelCard item={item} />}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Layout>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={styles.modalContent}>
          <View style={styles.closeIconContainer}>
            <TouchableOpacity onPress={handleCloseModal}>
              <CloseIcon color={retrieveColorString()} />
            </TouchableOpacity>
          </View>
          <View style={styles.accordionContainer}>
            <CustomAccordion sections={SECTIONS} />
            <SearchButton onClick={() => {}} />
          </View>
        </View>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  shadowView: {
    height: 35,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 30,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  listView: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
  },
  flatListContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  touch: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'black',
  },
  modalContent: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  accordionContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flex: 1,
  },
  closeIconContainer: {
    alignSelf: 'flex-start',
    marginStart: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  hotelImage: {
    borderRadius: 8,
    resizeMode: 'cover',
    width: width - 60,
    height: (width - 40) * 0.6,
    padding: 10,
  },
  hotelInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  hotelName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  hotelLocation: {
    color: '#555',
    fontSize: 14,
  },
  hotelPrice: {
    color: retrieveColorString(),
    fontWeight: 'bold',
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

export default FindScreen;
