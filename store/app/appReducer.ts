import {
  CONNECT_WIFI,
  SET_CONFIG_MODE,
  SET_CONFIG_SSID,
  SET_PROGRESS,
  SET_SSID,
  SET_WIFI_STATE,
} from './action';
import {AppActionType, AppState} from './types';
const initialState: AppState = {
  isConnected: true,
  switchWifi: false,
  ssid: null,
  configSsid: '',
  progress: false,
  progressMessage: null,
  isConfig: false,
};

export function appReducer(
  state = initialState,
  action: AppActionType,
): AppState {
  switch (action.type) {
    case SET_SSID:
      if (state.ssid === action.payload) return state;
      return {
        ...state,
        ssid: action.payload,
      };

    case SET_CONFIG_MODE:
      return {
        ...state,
        isConfig: action.payload,
      };

    case SET_WIFI_STATE:
      return {
        ...state,
        isConnected: action.payload,
      };

    case SET_PROGRESS:
      return {
        ...state,
        ...action.payload,
      };

    case SET_CONFIG_SSID:
      return {
        ...state,
        configSsid: action.payload,
      };

    case CONNECT_WIFI:
      return {
        ...state,
        switchWifi: action.payload,
      };

    default:
      return state;
  }
}
