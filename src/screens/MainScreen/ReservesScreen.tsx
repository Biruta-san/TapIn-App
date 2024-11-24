import React, {useCallback, useContext, useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import Text from '../../shared/components/Typography/Text';
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
import {getDataByIdApi} from '../../shared/utils/api/functions';
import {UserContext} from '../../shared/context/UserProvider';
import {USUARIO_AGENDAMENTOS_ROUTE} from '../../shared/apiroutes';
import {Spinner} from '@ui-kitten/components';

type RootStackParamList = {
  Checkin: {id: number};
};

interface ReservesScreenProps {
  route?: any;
}

const ReservesScreen: React.FC<ReservesScreenProps> = () => {
  const [listAgendamentos, setListAgendamentos] = useState<
    UsuarioAgendamento[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userContext = useContext(UserContext);

  const handleSearchAgendamentos = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getDataByIdApi<UsuarioAgendamento[]>(
        USUARIO_AGENDAMENTOS_ROUTE,
        userContext?.user?.id ?? 0,
      );
      if (result.status >= 200 && result.status < 300) {
        setListAgendamentos(result.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [userContext?.user?.id]);

  useEffect(() => {
    handleSearchAgendamentos();
  }, [handleSearchAgendamentos]);

  const renderItem: ListRenderItem<UsuarioAgendamento> = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Checkin', {id: item.id});
        }}>
        <Card>
          <View style={styles.imageView}>
            {item.hotelImagens && item.hotelImagens?.length > 0 && (
              <ImageSlider
                images={item.hotelImagens}
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
            )}
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
          {!loading ? (
            <FlatList
              data={listAgendamentos}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <Layout bg="white">
              <Spinner />
            </Layout>
          )}
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
