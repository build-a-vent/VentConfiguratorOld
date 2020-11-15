/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import wifi from 'react-native-android-wifi';
import {Provider} from 'react-redux';
import AppNavigator from './AppNavigator';
import EnableWifi from './components/EnableWifi';
import Progress from './components/Progress';
import {WIFI_CONNECTION} from './constants/app';
import {Colors} from './constants/styles';
import {setProgress, setSsid, setWifiAppState} from './store/app/action';
import store from './store/store';

NetInfo.addEventListener((state: NetInfoState) => {
  store.dispatch(setSsid(state?.details?.ssid ?? ''));
  const appData = store.getState().app;

  if (
    appData.isConfig === true &&
    appData.configSsid !== state?.details?.ssid
  ) {
    store.dispatch(
      setProgress(true, 'The vent wifi is lost go back ans tart again'),
    );
    setTimeout(() => {
      store.dispatch(setProgress(false, null));
    }, 5000);

    return;
  }
  if (appData.switchWifi === true || appData.isConfig === true) return;
  store.dispatch(setProgress(false, null));
  store.dispatch(setWifiAppState(state.type === WIFI_CONNECTION));
});

wifi.isEnabled((isEnabled: boolean) =>
  store.dispatch(setWifiAppState(isEnabled)),
);

const App: React.FunctionComponent = (props) => {
  return (
    <Provider store={store}>
      <EnableWifi />
      <Progress />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.backgroundColor,
    height: Dimensions.get('window').height,
  },
});

export default App;
