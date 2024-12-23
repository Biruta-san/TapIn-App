import React, {useContext, useState} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Layout from '../../shared/components/Layouts/Layout';
import Text from '../../shared/components/Typography/Text';
import BaseButton from '../../shared/components/Form/Buttons/BaseButton';
import Input from '../../shared/components/Form/Inputs/Input';
import {postDataApi, updateApiHeaders} from '../../shared/utils/api/functions';
import LocationIcon from '../../shared/components/Icons/LocationIcon';
import {USUARIO_LOGIN_ROUTE} from '../../shared/apiroutes';
import {retrieveColorString} from '../../shared/utils/enums/styleEnums';
import {SafeAreaView} from 'react-native-safe-area-context';
import {User, UserContext} from '../../shared/context/UserProvider';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

interface LoginResponse {
  token: string;
  usuario: User;
}

const {height} = Dimensions.get('window');

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const userContext = useContext(UserContext);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  // const [hotelId, setHotelId] = useState<string>(); // Assuming hotelId is a string, adjust if necessary
  const hotelId: number | null = null;
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await postDataApi<LoginResponse>(USUARIO_LOGIN_ROUTE, {
        email,
        password,
        hotelId,
      });
      if (result.data.token) {
        updateApiHeaders(result.data.token);
        userContext?.setUser(result.data.usuario);
        navigation.navigate('Main');
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Layout flex={1} bg={retrieveColorString()}>
        <Layout flex={4}>
          <LocationIcon size={120} color="white" />
          <Text category={'h1'} color={'white'}>
            Tap In
          </Text>
        </Layout>
        <Layout
          flex={6}
          borderTopLeftRadius={30}
          borderTopRightRadius={30}
          bg={'white'}
          justifyContent="flex-start"
          gap={height * 0.05}>
          <Text mt={height * 0.05} category={'h2'} useThemeColor>
            Login
          </Text>
          <Layout
            justifyContent="flex-start"
            bg={'inherit'}
            gap={height * 0.05}>
            <Input
              label="Email"
              placeholder={'Informe o email'}
              value={email}
              onChange={setEmail}
            />
            <Input
              label="Senha"
              placeholder={'Informe a senha'}
              value={password}
              onChange={setPassword}
              isPassword
            />
            <BaseButton loading={loading} onPress={handleLogin}>
              <Text fontWeight="bold" color={'white'}>
                Entrar
              </Text>
            </BaseButton>
          </Layout>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: retrieveColorString(),
  },
});

export default LoginScreen;
