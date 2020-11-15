import {CONNECT_WIFI, SET_PROGRESS, SET_SSID, SET_WIFI_STATE} from './action';
import {AppActionType, AppState} from './types';
const initialState: AppState = {
  isConnected: true,
  switchWifi: false,
  ssid: null,
  progress: false,
  progressMessage: null,
};

export function appReducer(
  state = initialState,
  action: AppActionType,
): AppState {
  switch (action.type) {
    case SET_SSID:
      return {
        ...state,
        ssid: action.payload,
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

    case CONNECT_WIFI:
      return {
        ...state,
        switchWifi: action.payload,
      };
    default:
      return state;
  }
}
