import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WifiManager, {WifiEntry} from 'react-native-wifi-reborn';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootStackParamList} from '../../AppNavigator';
import {SSID_FRAGMENT} from '../../constants/app';
import {connectVent} from '../../helper/connectVent';
import {
  setConfigMode,
  setConfigSsid,
  setProgress,
  switchWifi,
} from '../../store/app/action';
import store from '../../store/store';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';

export type WifiListScreenNavProps = StackNavigationProp<
  RootStackParamList,
  'Index'
>;

function scanNetworks(cb: (list: WifiEntry[]) => void) {
  cb([]);
  store.dispatch(setProgress(true, 'Rescan networks'));
  WifiManager.reScanAndLoadWifiList().then((list: WifiEntry[]) => {
    cb(list.filter((entry: WifiEntry) => entry.SSID.startsWith(SSID_FRAGMENT)));

    store.dispatch(setProgress(false, null));
  });
}

export async function ensureReachableWifi(
  navigation: WifiListScreenNavProps,
  ssid: string,
) {
  const netInfo = await NetInfo.fetch();
  if (netInfo?.type === 'wifi' && netInfo.isConnected === true) {
    store.dispatch(setProgress(true, 'Connect to Vent'));
    store.dispatch(switchWifi(false));
    store.dispatch(setConfigSsid(ssid));
    store.dispatch(setConfigMode(true));
    navigation.navigate('Config');
    return;
  }

  setTimeout(() => {
    ensureReachableWifi(navigation, ssid);
  }, 1000);
}

type TProps = ReturnType<typeof mapDispatchToState>;

const WifiList: React.FunctionComponent<TProps> = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [networks, setNetworks] = useState<WifiEntry[]>([]);
  const navigation: WifiListScreenNavProps = useNavigation();
  props.resetConfigMode();
  useEffect(() => {
    if (isLoaded === false) {
      props.setConfigSsid();

      setIsLoaded(true);
      scanNetworks(setNetworks);
    }
  }, [isLoaded, setIsLoaded, props]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerText}>Available Networks</Text>
      </View>

      <Text style={networks.length === 0 ? styles.active : styles.hidden}>
        No active vent wifi found
      </Text>

      <FlatList
        style={styles.list}
        data={networks}
        keyExtractor={(item: WifiEntry) => item.SSID}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => connectVent(item.SSID, navigation)}
              style={styles.item}>
              <Text style={styles.itemText}>{item.SSID}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.rescanButton}>
        <Button
          title="Resacan networks"
          onPress={() => scanNetworks(setNetworks)}
        />
      </View>
    </SafeAreaView>
  );
};

const mapDispatchToState = (dispatch: Dispatch) => ({
  setConfigSsid: () => dispatch(setConfigSsid('')),
  resetConfigMode: () => dispatch(setConfigMode(false)),
});

export default connect(null, mapDispatchToState)(WifiList);
