import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Text from '../../shared/components/Typography/Text';
import CustomAccordion from '../../shared/components/Accordion/CustomAccordion';
import RangeDatepicker from '../../shared/components/Form/Inputs/RangeDatePicker';
import NumericInput from '../../shared/components/Form/Inputs/NumericInput';
import BaseButton from '../../shared/components/Form/Buttons/BaseButton';
import {RouteProp} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ImageSlider from '../../shared/components/Media/ImageSlider/ImageSlider';
import {
  retrieveColorString,
  styleTypeEnums,
  weightEnums,
} from '../../shared/utils/enums/styleEnums';

type ReservarScreenProps = {
  route: RouteProp<{params: {hotelId: number; item: HotelItem}}, 'params'>;
};

interface HotelItem {
  id: number;
  nome: string;
  cidade: string;
  endereco: string;
  valorDiaria: number;
}

const ReservarScreen: React.FC<ReservarScreenProps> = ({route}) => {
  const hotelId = route?.params?.hotelId;
  const item = route?.params?.item;
  // const [dadosHotel, setDadosHotel] = useState<HotelItem | null>(null);
  const [quando, setQuando] = useState<{startDate?: Date; endDate?: Date}>({});
  const [quantasPessoas, setQuantasPessoas] = useState<string>();

  // Mocked image URLs
  const fotos: string[] = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
    'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  ];

  // Accordion sections
  const SECTIONS = [
    {
      title: 'Realizar reserva',
      content: (
        <>
          <RangeDatepicker
            range={quando}
            onSelect={nextRange => setQuando(nextRange)}
            label={'Período da viagem'}
            placeholder={'Selecione o período'}
            mb={5}
          />
          <NumericInput
            value={quantasPessoas}
            onChange={value => setQuantasPessoas(value)}
            w={'100%'}
            placeholder={'Quantidade de pessoas'}
            label={'Informe a quantidade de pessoas'}
            mb={5}
          />
          <BaseButton mb={5} w={'100%'} onPress={() => {}}>
            <Text fontWeight="bold" color="white">
              Agendar
            </Text>
          </BaseButton>
        </>
      ),
    },
  ];

  // Fetch hotel data
  useEffect(() => {
    const fetchData = async () => {
      if (hotelId) {
        // const result = await getDataByIdApi<HotelItem>(HOTEL_ROUTE, hotelId);
        // setDadosHotel(result.data);
      }
    };
    fetchData();
  }, [hotelId]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageSlider
        images={fotos}
        imageHeight={250}
        dotSize={10}
        dotColor={retrieveColorString(styleTypeEnums.PRIMARY, weightEnums[700])}
        activeDotColor={retrieveColorString(
          styleTypeEnums.PRIMARY,
          weightEnums[700],
        )}
        showNavigationButtons={false}
        showIndicatorDots={true}
        imageLabel={false}
        extrapolate="clamp"
        autoSlideInterval={10000}
        containerStyle={styles.container}
        radius={5}
      />
      <View style={styles.detailsContainer}>
        <Text category={'h1'} style={styles.hotelName}>
          {item?.nome}
        </Text>
        <Text style={styles.hotelLocation}>
          {`${item?.cidade} ${item?.endereco}`}
        </Text>
        <Text category={'h6'} useThemeColor fontWeight={'bold'}>
          {`Diária: R$ ${item?.valorDiaria}`}
        </Text>
        <CustomAccordion sections={SECTIONS} />
      </View>
    </SafeAreaView>
  );
};

export default ReservarScreen;

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -50,
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  hotelLocation: {
    fontSize: 16,
    color: '#202020',
    marginBottom: 10,
  },
  container: {
    backgroundColor: retrieveColorString(
      styleTypeEnums.PRIMARY,
      weightEnums[200],
    ),
    flex: 1,
  },
});
