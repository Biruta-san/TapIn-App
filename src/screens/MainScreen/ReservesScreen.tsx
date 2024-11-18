import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, ListRenderItem} from 'react-native';
import Text from '../../shared/components/Typography/Text';
import {
  generateUserReservesList,
  UsuarioAgendamento,
} from '../../shared/utils/mocks/hotel';
import Layout from '../../shared/components/Layouts/Layout';
import Card from '../../shared/components/Cards/Card';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {getLocaleDateString} from '../../shared/utils/dateUtils';
import {retrieveColorString} from '../../shared/utils/enums/styleEnums';

// Define the type for the navigation prop
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

  const renderItem: ListRenderItem<UsuarioAgendamento> = ({item}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate('Checkin');
        }}>
        <Card>
          <View style={styles.hotelInfo}>
            <Text category={'h6'} fontWeight={'bold'} useThemeColor>
              {item.hotelNome}
            </Text>
            <Text>{item.hotelEndereco}</Text>
            <Text>{`Quarto: ${item.hotelQuartoNumero}`}</Text>
            <Text>
              {`${getLocaleDateString(item.checkIn)} - ${getLocaleDateString(
                item.checkOut,
              )}`}
            </Text>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <Layout flex={1} bg={'white'}>
      <Layout flex={1} bg={'white'} paddingTop={10}>
        <Text mt={10} category={'h3'} useThemeColor>
          Reservas
        </Text>
        <View style={styles.listView}>
          <FlatList
            data={listAgendamentos}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
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
    width: '100%',
    paddingTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
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
});

export default ReservesScreen;
