import {NetworkInfo} from 'react-native-network-info';
import WifiManager from 'react-native-wifi-reborn';
import {
  ensureReachableWifi,
  WifiListScreenNavProps,
} from '../components/WifiList';
import {setProgress, switchWifi} from '../store/app/action';
import store from '../store/store';

export function connectVent(ssid: string, navigation?: WifiListScreenNavProps) {
  NetworkInfo.getSSID().then(async (currentSSid) => {
    if (currentSSid === ssid && navigation) {
      navigation.navigate('Config');
      return;
    }

    store.dispatch(setProgress(true, `Connect vent wifi ${ssid}`));
    store.dispatch(switchWifi(true));

    await WifiManager.connectToProtectedSSID(ssid, ssid.substr(4), true).then(
      async () => {
        if (navigation) {
          ensureReachableWifi(navigation, ssid);
        }
      },
      () => connectVent(ssid, navigation),
    );
    return true;
  });
}
