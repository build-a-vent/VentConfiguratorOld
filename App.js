/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { navigationRef } from './RootNavigation';
import { INDEX_PAGE, VENT_SELECT_PAGE } from './constants/Navigation';
import IndexView from './Components/index/Index';
import Footer from './Components/footer/Footer';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import VentSelect from './Components/ventSelect/VentSelect';

const Stack = createStackNavigator();


const App = () => {

  return (
    <Provider store={Store}>
      <View style={styles.main}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={INDEX_PAGE} headerMode="none">
            <Stack.Screen
              name={INDEX_PAGE}
              component={IndexView}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forRevealFromBottomAndroid,
              }} />
            <Stack.Screen
              name={VENT_SELECT_PAGE}
              component={VentSelect}
              options={{
                cardStyleInterpolator:
                  CardStyleInterpolators.forRevealFromBottomAndroid,
              }}
            />
          </Stack.Navigator>

        </NavigationContainer>
      </View>
      <Footer />
    </Provider>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: 'deeppink'
  }
})

export default App;
