import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import theme from "./theme.json";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes, { initialRouteName } from "./routes";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();

const App = () => {
  LogBox.ignoreAllLogs(true);
  return (
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
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
  );
};

export default App;