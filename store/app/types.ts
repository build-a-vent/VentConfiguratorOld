import {Action} from 'redux';
import {
  CONNECT_WIFI,
  SET_CONFIG_MODE,
  SET_CONFIG_SSID,
  SET_PROGRESS,
  SET_SSID,
  SET_WIFI_STATE,
} from './action';

export type AppState = {
  isConnected: boolean;
  switchWifi: boolean;
  ssid: string | null;
  progress: boolean;
  progressMessage: string | null;
  configSsid: string | null;
  isConfig: boolean;
};

interface ISetWifiState extends Action<typeof SET_WIFI_STATE> {
  payload: boolean;
}

interface ISetSsid extends Action<typeof SET_SSID> {
  payload: string | null;
}

interface ISetConfigSsid extends Action<typeof SET_CONFIG_SSID> {
  payload: string | null;
}

interface ISetProgess extends Action<typeof SET_PROGRESS> {
  payload: {
    progress: boolean;
    progressMessage: string | null;
  };
}

interface ISetIsConfigMode extends Action<typeof SET_CONFIG_MODE> {
  payload: boolean;
}

interface ISwitchWifi extends Action<typeof CONNECT_WIFI> {
  payload: boolean;
}

export type AppActionType =
  | ISetWifiState
  | ISetSsid
  | ISetIsConfigMode
  | ISetProgess
  | ISetConfigSsid
  | ISwitchWifi;
