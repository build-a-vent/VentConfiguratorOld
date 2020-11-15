import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../AppNavigator';

export type TResponseBroadcast = {
  cmd: 'status';
  c_pip: number;
  c_lip: number;
  c_pep: number;
  c_lep: number;
  c_flair: number;
  c_flo2: number;
  c_intair: number;
  c_into2: number;
  c_airt: number;
  c_o2t: number;
  c_inspt: number;
  c_cyclt: number;
  c_wtemp: number;
  c_name: string;
  c_ssid: string;
  c_passwd: string;
  mac: string;
  a_pip: number;
  a_eip: number;
  a_eep: number;
};

export type TWifiListScreenNavProps = StackNavigationProp<
  RootStackParamList,
  'Config'
>;
