import SInfo from 'react-native-sensitive-info';
import Store from '../redux/Store';
import {setDefaultWifi, setStoredWifi} from '../redux/actions/Wifi';

export const SHARED_PREFERENCES_NAME = 'ventConfigPrefs';
export const KEYCHAIN_SERVICE = 'ventConfigKeychain';

async function getItems() {
  return await SInfo.getAllItems({
    sharedPreferencesName: SHARED_PREFERENCES_NAME,
    keychainService: KEYCHAIN_SERVICE,
  });
}

export const saveToKeychain = async (key, value) => {
  SInfo.setItem(key, value, {
    sharedPreferencesName: SHARED_PREFERENCES_NAME,
    keychainService: KEYCHAIN_SERVICE,
  });
};

(async () => {
  const data = await getItems();

  if (data.length) {
    data[0].forEach((data) => {
      //SInfo.deleteItem(data.key, {
      //  sharedPreferencesName: SHARED_PREFERENCES_NAME,
      //  keychainService: KEYCHAIN_SERVICE,
      //});
      if (data.key === 'default') {
        Store.dispatch(setDefaultWifi(data.value));
      } else {
        Store.dispatch(setStoredWifi({ssid: data.key, password: data.value}));
      }
    });
  }
})();
