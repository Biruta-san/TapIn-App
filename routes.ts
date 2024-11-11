// import LoginScreen from './src/screens/LoginScreen';
// import MainScreen from './src/screens/MainScreen';
// import ReservarScreen from './src/screens/ReservarScreen';

interface route {
  name: string;
  component?: any;
  options: object;
}

const routes : route[] = [
  {
    name: 'Login',
    // component: LoginScreen,
    options: {headerShown: false},
  },
  {
    name: 'Main',
    // component: MainScreen,
    options: {headerShown: false},
  },
  {
    name: 'Reservar',
    // component: ReservarScreen,
    options: {headerShown: false},
  },
];

export const initialRouteName : string = 'Login';

export default routes;
