import {NavigationContainer} from '@react-navigation/native';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import theme from './theme.json';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import routes, {initialRouteName} from './routes';
import {LogBox} from 'react-native';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {UserProvider} from './src/shared/context/UserProvider';

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <UserProvider>
      <SafeAreaProvider>
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName}>
              {routes.map((route, index) => (
                <Stack.Screen
                  key={index}
                  name={route.name}
                  component={route.component}
                  options={route.options}
                />
              ))}
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default App;
