import {Spinner} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import NfcManager, {NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {SafeAreaView} from 'react-native-safe-area-context';
import BaseButton from '../../shared/components/Form/Buttons/BaseButton';
import Text from '../../shared/components/Typography/Text';

const CheckinScreen: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const [tagInfo, setTagInfo] = useState<any>(null);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();

      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.setEventListener(NfcEvents.SessionClosed, null);
      setIsSearching(false);
    };
  }, []);

  const readNdef = async () => {
    try {
      setIsSearching(true);
      console.log('iniciando');
      await NfcManager.requestTechnology(NfcTech.NfcV);
      const tag = await NfcManager.getTag();
      setTagInfo(tag);

      console.log(tag, tagInfo);

      // if (tag) {
      //   const status = await NfcManager.nfcVHandler.transceive();

      //   if (Platform.OS === 'ios') {
      //     await NfcManager.setAlertMessageIOS('NDEF tag encontrada');
      //   }
      //   console.warn('Tag encontrada', tag, status);
      // }
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

  return (
    <SafeAreaView style={styles.container}>
      {hasNfc === null ? (
        <Text style={styles.message}>
          Verificando compatibilidade com NFC...
        </Text>
      ) : hasNfc ? (
        <>
          {isSearching ? (
            <>
              <View style={styles.loadingContainer}>
                <Spinner size="giant" />
              </View>
              <BaseButton onPress={stopReadNdef}>
                <Text fontWeight="bold" color={'white'}>
                  Parar pesquisa
                </Text>
              </BaseButton>
            </>
          ) : (
            <BaseButton onPress={readNdef}>
              <Text fontWeight="bold" color={'white'}>
                Pesquisar tags
              </Text>
            </BaseButton>
          )}
        </>
      ) : (
        <Text style={styles.message}>NFC não é suportado pelo dispositivo</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  message: {
    fontSize: 18,
    color: 'black',
  },
  fixedCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  loadingText: {
    fontSize: 14,
    color: 'white',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
    position: 'absolute',
    opacity: 0.5,
  },
  searchButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckinScreen;
