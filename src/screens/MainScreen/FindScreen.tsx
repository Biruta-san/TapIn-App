import React, {useEffect, useState} from 'react';
import Layout from '../../shared/components/Layouts/Layout';
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchButton from '../../shared/components/Form/Buttons/SearchButton';
import Input from '../../shared/components/Form/Inputs/Input';
import RangeDatepicker from '../../shared/components/Form/Inputs/RangeDatePicker';
import NumericInput from '../../shared/components/Form/Inputs/NumericInput';
import {generateHotelsList, Hotel} from '../../shared/utils/mocks/hotel';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Text from '../../shared/components/Typography/Text';
import Card from '../../shared/components/Cards/Card';
import ImageSlider from '../../shared/components/Media/ImageSlider';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import CustomAccordion from '../../shared/components/Accordion/CustomAccordion';
import SearchIcon from '../../shared/components/Icons/SearchIcon';
import CloseIcon from '../../shared/components/Icons/CloseIcon';
import {retrieveColorString} from '../../shared/utils/enums/styleEnums';

const HotelCard = ({item}: {item: Hotel}) => {
  type RootStackParamList = {
    Reservar: {hotelId: number; item: Hotel};
  };
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const fotos = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
    'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  ];

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate('Reservar', {hotelId: item.id, item});
      }}>
      <Card>
        <ImageSlider images={fotos} />
        <View style={styles.hotelInfo}>
          <Text style={styles.hotelName}>{item.nome}</Text>
          <Text style={styles.hotelLocation}>
            {`${item.cidade} ${item.endereco} ${item.numero}`}
          </Text>
          <Text
            style={styles.hotelPrice}>{`Diária: R$ ${item.valorDiaria}`}</Text>
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
    const fetchData = async () => {
      handleSearchHoteis();
    };
    fetchData();
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
    <Layout flex={1}>
      <Layout flex={1} bg={'white'} paddingTop={10}>
        <View style={styles.shadowView}>
          <TouchableOpacity
            style={styles.touch}
            activeOpacity={1}
            onPress={() => setModalVisible(true)}>
            <View style={styles.container}>
              <SearchIcon />
              <Text>Pesquisar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.listView}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {listHoteis.map((hotel, index) => (
              <HotelCard key={index} item={hotel} />
            ))}
          </ScrollView>
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
              <CloseIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.accordionContainer}>
            <CustomAccordion sections={SECTIONS} />
          </View>
          <SearchButton onClick={() => {}} />
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 10,
  },
  scrollViewContent: {
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
    justifyContent: 'space-between',
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
  searchButton: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  hotelImage: {
    borderRadius: 8,
    resizeMode: 'cover',
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
});

export default FindScreen;
