import {AppActionType} from './types';
export const SET_WIFI_STATE = 'app/SET_WIFI_STATE';
export const SET_SSID = 'app/SET_SSID';
export const SET_PROGRESS = 'app/SET_PROGRESS';
export const CONNECT_WIFI = 'app/CONNECT_WIFI';

export function setWifiAppState(isOnline: boolean): AppActionType {
  return {
    type: SET_WIFI_STATE,
    payload: isOnline,
  };
}

export function switchWifi(connect: boolean): AppActionType {
  return {
    type: CONNECT_WIFI,
    payload: connect,
  };
}

export function setSsid(ssid: string): AppActionType {
  return {
    type: SET_SSID,
    payload: ssid,
  };
}

export function setProgress(
  progress: boolean,
  progressMessage: string | null,
): AppActionType {
  return {
    type: SET_PROGRESS,
    payload: {
      progress,
      progressMessage,
    },
  };
}
