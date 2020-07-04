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
import { PermissionsAndroid } from 'react-native';

import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import { navigationRef } from './RootNavigation';


import { INDEX_PAGE } from './constants/Navigation';
import IndexView from './Components/index/Index';
import Footer from './Components/footer/Footer';


const Stack = createStackNavigator();

async function getPermissions(params) {

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    // You can now use react-native-wifi-reborn
    console.log('got access')
  } else {
    console.log('no access')
    // Permission denied
  }

}

const App = () => {
  getPermissions();
  return (
    <>
      <Text>WORKS</Text>
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
          </Stack.Navigator>

        </NavigationContainer>
      </View>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: 'deeppink'
  }
})

export default App;
