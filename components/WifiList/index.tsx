import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {Button, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';
import {SafeAreaView} from 'react-native-safe-area-context';
import WifiManager, {WifiEntry} from 'react-native-wifi-reborn';
import {RootStackParamList} from '../../AppNavigator';
import {SSID_FRAGMENT} from '../../constants/app';
import {setProgress, switchWifi} from '../../store/app/action';
import store from '../../store/store';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';

type WifiListScreenNavProps = StackNavigationProp<RootStackParamList, 'Index'>;

function scanNetworks(cb: (list: WifiEntry[]) => void) {
  cb([]);
  store.dispatch(setProgress(true, 'Rescan networks'));
  WifiManager.reScanAndLoadWifiList().then((list: WifiEntry[]) => {
    cb(list.filter((entry: WifiEntry) => entry.SSID.startsWith(SSID_FRAGMENT)));

    store.dispatch(setProgress(false, null));
  });
}

async function ensureReachableWifi(
  navigation: WifiListScreenNavProps,
  ssid: string,
) {
  const netInfo = await NetInfo.fetch();
  if (netInfo?.type === 'wifi' && netInfo.isConnected === true) {
    store.dispatch(setProgress(true, 'Connect to Vent'));
    store.dispatch(switchWifi(false));
    navigation.navigate('Config', {ssid: 'fdfd', connect: true});
    return;
  }

  setTimeout(() => {
    ensureReachableWifi(navigation, ssid);
  }, 1000);
}

function connectVent(ssid: string, navigation: WifiListScreenNavProps) {
  NetworkInfo.getSSID().then(async (currentSSid) => {
    if (currentSSid === ssid) {
      navigation.navigate('Config', {ssid: currentSSid, connect: false});
      return;
    }

    store.dispatch(setProgress(true, 'Connect vent wifi'));
    store.dispatch(switchWifi(true));

    const fo = await WifiManager.connectToProtectedSSID(
      ssid,
      ssid.substr(4),
      true,
    ).then(
      () => ensureReachableWifi(navigation, ssid),
      () => connectVent(ssid, navigation),
    );
    return true;
  });
}

const WifiList: React.FunctionComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [networks, setNetworks] = useState<WifiEntry[]>([]);
  const navigation: WifiListScreenNavProps = useNavigation();
  useEffect(() => {
    if (isLoaded === false) {
      setIsLoaded(true);
      scanNetworks(setNetworks);
    }
  }, [isLoaded, setIsLoaded]);

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

export default WifiList;
