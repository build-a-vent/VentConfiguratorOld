import AsyncStorage from '@react-native-community/async-storage';
//import Store from "../redux/Store";
//import { WIFI_STORAGE } from "../constants/Storage";
//import { setStoredWifiAction } from "../redux/actions/Storage";


async function readSavedWifi() {
    const wifi = await AsyncStorage.getItem(WIFI_STORAGE);


    console.log('WIFI IS =====>', wifi)
    //if (!wifi) {
    //    Store.dispatch(setStoredWifiAction([]));
    //    return;
    //}


}



readSavedWifi();
