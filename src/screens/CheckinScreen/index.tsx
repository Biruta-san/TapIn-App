import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {Spinner} from '@ui-kitten/components';
import Text from '../../shared/components/Typography/Text';
import BaseButton from '../../shared/components/Form/Buttons/BaseButton';
import ImageSlider from '../../shared/components/Media/ImageSlider/ImageSlider';
import {
  retrieveColorString,
  styleTypeEnums,
  weightEnums,
} from '../../shared/utils/enums/styleEnums';
import {RouteProp} from '@react-navigation/native';
import CustomAccordion from '../../shared/components/Accordion/CustomAccordion';
import {getDataByIdApi, putDataApi} from '../../shared/utils/api/functions';
import {
  HOTEL_CONFIRMAR_AGENDAMENTO_ROUTE,
  USUARIO_AGENDAMENTO_ROUTE,
} from '../../shared/apiroutes';
import {UsuarioAgendamento} from '../../shared/interfaces/usuario';
import Layout from '../../shared/components/Layouts/Layout';

type NFCReservarScreenProps = {
  route: RouteProp<{params: {id: number}}, 'params'>;
  navigation: {
    navigate: (screen: string) => void;
  };
};

interface AccordionContentProps {
  dadosHotel?: UsuarioAgendamento;
  hasNfc: boolean | null;
  isSearching: boolean;
  stopReadNdef: () => void;
  readNdef: () => void;
}

const AccordionContent = ({
  dadosHotel,
  hasNfc,
  isSearching,
  stopReadNdef,
  readNdef,
}: AccordionContentProps) => {
  if (!hasNfc) {
    return (
      <Text style={styles.message}>NFC não é suportado pelo dispositivo</Text>
    );
  } else if (!dadosHotel?.checkInConfirmado) {
    return (
      <>
        <Text style={styles.message}>Realizar check-in</Text>
        {isSearching ? (
          <>
            <View style={styles.loadingContainer}>
              <Spinner size="giant" />
            </View>
            <View style={styles.loadingContainer}>
              <BaseButton onPress={stopReadNdef}>
                <Text fontWeight="bold" color={'white'}>
                  Parar pesquisa
                </Text>
              </BaseButton>
            </View>
          </>
        ) : (
          <BaseButton w={'100%'} onPress={readNdef}>
            <Text fontWeight="bold" color={'white'}>
              Pesquisar tags
            </Text>
          </BaseButton>
        )}
      </>
    );
  } else if (dadosHotel?.checkInConfirmado && !dadosHotel?.checkOutConfirmado) {
    return (
      <>
        <Text style={styles.message}>Realizar check-out</Text>
        {isSearching ? (
          <>
            <View style={styles.loadingContainer}>
              <Spinner size="giant" />
            </View>
            <BaseButton w={'100%'} onPress={stopReadNdef}>
              <Text fontWeight="bold" color={'white'}>
                Parar pesquisa
              </Text>
            </BaseButton>
          </>
        ) : (
          <BaseButton w={'100%'} onPress={readNdef}>
            <Text fontWeight="bold" color={'white'}>
              Pesquisar tags
            </Text>
          </BaseButton>
        )}
      </>
    );
  } else {
    return <Text style={styles.message}>Agendamento concluído</Text>;
  }
};

const NFCReservarScreen: React.FC<NFCReservarScreenProps> = ({route}) => {
  const id = route?.params?.id;

  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [tagInfo, setTagInfo] = useState<any>(null);
  const [dadosHotel, setDadosHotel] = useState<UsuarioAgendamento>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const result = await getDataByIdApi<UsuarioAgendamento>(
            USUARIO_AGENDAMENTO_ROUTE,
            id,
          );
          if (result.status >= 200 && result.status < 300) {
            setDadosHotel(result.data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    fetchData();
    checkIsSupported();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      setIsSearching(false);
    };
  }, [id]);

  const readNdef = async () => {
    try {
      setIsSearching(true);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setTagInfo(tag);

      if (tag) {
        if (Platform.OS === 'ios') {
          await NfcManager.setAlertMessageIOS('NDEF tag encontrada');
        }
        await doCheckin();
      }
      console.log(tag, tagInfo);
    } catch (ex) {
      console.warn('Oops!', JSON.stringify(ex));
    } finally {
      stopReadNdef();
    }
  };

  const stopReadNdef = async () => {
    try {
      await NfcManager.cancelTechnologyRequest();
    } catch (ex) {
      console.warn('Oops!', ex);
    } finally {
      setIsSearching(false);
    }
  };

  const doCheckin = async () => {
    try {
      await putDataApi(HOTEL_CONFIRMAR_AGENDAMENTO_ROUTE, id, {
        checkInConfirmado: !dadosHotel?.checkInConfirmado,
        checkOutConfirmado:
          dadosHotel?.checkInConfirmado && !dadosHotel?.checkOutConfirmado,
        tagId: tagInfo.id,
      });
      const result = await getDataByIdApi<UsuarioAgendamento>(
        USUARIO_AGENDAMENTO_ROUTE,
        id,
      );
      setDadosHotel(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Accordion sections
  const SECTIONS = [
    {
      title: !dadosHotel?.checkInConfirmado
        ? 'Realizar check-in'
        : dadosHotel?.checkInConfirmado && !dadosHotel?.checkOutConfirmado
        ? 'Realizar check-out'
        : 'Agendamento concluído',
      content: (
        <AccordionContent
          dadosHotel={dadosHotel}
          hasNfc={hasNfc}
          isSearching={isSearching}
          readNdef={readNdef}
          stopReadNdef={stopReadNdef}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <Layout bg="white">
        <Spinner size="giant" />
      </Layout>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {dadosHotel?.hotelImagens && dadosHotel?.hotelImagens.length > 0 && (
        <ImageSlider
          images={dadosHotel?.hotelImagens ?? []}
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
          containerStyle={styles.container}
          radius={5}
        />
      )}
      <View style={styles.detailsContainer}>
        <Text category={'h1'} style={styles.hotelName}>
          {`${dadosHotel?.hotelNome} - Quarto ${dadosHotel?.hotelQuartoNumero}`}
        </Text>
        <Text style={styles.hotelLocation}>
          {`${dadosHotel?.hotelEndereco}`}
        </Text>

        <View style={styles.nfcContainer}>
          <CustomAccordion sections={SECTIONS} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NFCReservarScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: retrieveColorString(
      styleTypeEnums.PRIMARY,
      weightEnums[200],
    ),
    flex: 1,
  },
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
  message: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  nfcContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
