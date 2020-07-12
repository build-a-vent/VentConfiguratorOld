export const SET_CURRENT_WIFI = 'SET_CURRENT_WIFI';

export const setCurrentWifi = (ssid) => ({
  type: SET_CURRENT_WIFI,
  ssid,
});

export const SET_CONFIG_WIFI = 'SET_CONFIG_WIFI';

export const setConfigWifi = (wifi) => ({
  type: SET_CONFIG_WIFI,
  wifi,
});

export const SET_STORED_WIFI = 'SET_STORED_WIFI';

export const setStoredWifi = (data) => ({
  type: SET_STORED_WIFI,
  data,
});

export const SET_DEFAULT_WIFI = 'SET_DEFAULT_WIFI';

export const setDefaultWifi = (ssid) => ({
  type: SET_DEFAULT_WIFI,
  ssid,
});

export const STAY_CURRENT_WIFI = 'STAY_CURRENT_WIFI';

export const stayCurrentWifi = () => ({
  type: STAY_CURRENT_WIFI,
});
