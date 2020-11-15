import {TState} from '../views/Config';
import {TValveConfigAction} from './../Network/Socket.d';

export type TConfigItem = {
  key: keyof TState;
  label: string;
  valueType: 'number' | null;
  onPress?: TValveConfigAction;
};

export const longTestingTime = 11000; // 11 seconds
export const shortTestingTime = 2000; // 2 seconds

export const configInputs: TConfigItem[] = [
  {
    key: 'c_name',
    valueType: null,
    label: 'Ventname',
  },
  {
    key: 'c_flair',
    valueType: 'number',
    label: 'Actual Flow Air',
    onPress: 'airone',
  },
  {
    key: 'c_flo2',
    valueType: 'number',
    label: 'Actual Flow O2',
    onPress: 'o2one',
  },
  {
    key: 'c_intair',
    valueType: 'number',
    label: 'Actual Flow Air/10x',
    onPress: 'airten',
  },
  {
    key: 'c_into2',
    valueType: 'number',
    label: 'Actual Flow O2/10x',
    onPress: 'o2ten',
  },
  {
    key: 'c_ssid',
    valueType: null,
    label: 'SSID',
  },
  {
    key: 'c_passwd',
    valueType: null,
    label: 'Wifi Password',
  },
];
