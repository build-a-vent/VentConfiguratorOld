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
