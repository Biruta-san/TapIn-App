import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {tabRoutes} from './tabRoutes';
import {
  SceneMap,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import {StyleSheet} from 'react-native';
import { retrieveColorString } from '../../shared/utils/enums/styleEnums';

// Define the shape of each tab route
interface TabRoute {
  key: string;
  title: string;
  icon: Element;
  component: React.ComponentType;
}

// Ensure tabRoutes matches the TabRoute type
const typedTabRoutes: TabRoute[] = tabRoutes.map(route => ({
  key: route.name,
  title: route.name,
  icon: route.icon,
  component: route.component,
}));

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  tab: {
    backgroundColor: 'white',
  },
});

const MainScreen: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  // Define the routes for the TabView
  const [routes] = useState(
    typedTabRoutes.map(route => ({
      key: route.key,
      title: route.title,
      icon: route.icon,
    })),
  );

  // Correctly create renderScene using static keys for SceneMap
  const renderScene = SceneMap(
    typedTabRoutes.reduce(
      (acc: {[key: string]: React.ComponentType}, route) => {
        acc[route.key] = route.component;
        return acc;
      },
      {},
    ),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        tabBarPosition={'bottom'}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{backgroundColor: retrieveColorString()}}
            style={styles.tab}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
