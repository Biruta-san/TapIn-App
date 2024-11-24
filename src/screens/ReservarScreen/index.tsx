import React, {useContext, useEffect, useState} from 'react';
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
import Selection, {Option} from '../../shared/components/Form/Inputs/Selection';
import {getDataByIdApi, postDataApi} from '../../shared/utils/api/functions';
import {
  Hotel,
  HotelQuartoAgendamento,
  ListHotelQuarto,
} from '../../shared/interfaces/hotel';
import {
  HOTEL_AGENDAR_ROUTE,
  HOTEL_QUARTO_LIST_ROUTE,
  HOTEL_ROUTE,
} from '../../shared/apiroutes';
import {userContext} from '../../shared/context/UserProvider';

type ReservarScreenProps = {
  route: RouteProp<{params: {hotelId: number}}, 'params'>;
  navigation: {
    navigate: (screen: string) => void;
  };
};

const ReservarScreen: React.FC<ReservarScreenProps> = ({route, navigation}) => {
  const hotelId = route?.params?.hotelId;
  const [dadosHotel, setDadosHotel] = useState<Hotel | null>(null);
  const [quando, setQuando] = useState<{startDate?: Date; endDate?: Date}>({});
  const [quantasPessoas, setQuantasPessoas] = useState<string>();
  const [quarto, setQuarto] = useState<number>();
  const [quartoOptions, setQuartoOptions] = useState<Option[]>([]);

  const fotos: string[] = [
    'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/40/e5/50/20190118-193234-largejpg.jpg',
    'https://www.civitatis.com/blog/wp-content/uploads/2022/11/downtown-orlando-florida.jpg',
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (hotelId) {
        const result = await getDataByIdApi<Hotel>(HOTEL_ROUTE, hotelId);
        setDadosHotel(result.data);
        const apiOptions = await getDataByIdApi<ListHotelQuarto[]>(
          HOTEL_QUARTO_LIST_ROUTE,
          hotelId,
        );
        if (apiOptions.status >= 200 && apiOptions.status < 300) {
          const options: Option[] = apiOptions.data.map(q => ({
            value: q.id,
            title: q.numero.toString(),
          }));
          setQuartoOptions(options);
        }
      }
    };
    fetchData();
  }, [hotelId]);

  const saveReservation = async () => {
    try {
      const response = await postDataApi<HotelQuartoAgendamento>(
        HOTEL_AGENDAR_ROUTE,
        {
          hotelQuartoId: quarto,
          usuarioId: user?.user?.id,
          dataCheckin: quando.startDate,
          dataCheckout: quando.endDate,
        },
      );
      if (response.status >= 200 && response.status < 300) {
        navigation.navigate('Main');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const user = useContext(userContext);

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
          <Selection
            label={'Selecione o quarto'}
            placeholder={'Selecione o quarto'}
            w={'100%'}
            options={quartoOptions}
            setValue={value =>
              setQuarto(Array.isArray(value) ? value[0] : value)
            }
          />
          <BaseButton mb={5} w={'100%'} onPress={saveReservation}>
            <Text fontWeight="bold" color="white">
              Agendar
            </Text>
          </BaseButton>
        </>
      ),
    },
  ];

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
          {`${dadosHotel?.nome}`}
        </Text>
        <Text style={styles.hotelLocation}>
          {`${dadosHotel?.cidade} ${dadosHotel?.endereco}`}
        </Text>
        <Text category={'h6'} useThemeColor fontWeight={'bold'}>
          {`Diária: R$ ${dadosHotel?.valorDiaria}`}
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
