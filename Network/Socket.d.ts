type TMessageBroadcast = {
  cmd: 'scan';
};

type TConfigModeMessage = {
  cmd: 'configmode';
  mac: string;
};

export type TValveConfigAction = 'airone' | 'o2one' | 'airten' | 'o2ten';

type TValveConfigMessage = {
  cmd: 'valvecfg';
  mac: string;
  action: TValveConfigAction;
};

type TSaveConfigMessage = {
  cmd: 'config';
  mac: string;
  ventname: string;
  c_flair: number;
  c_flo2: number;
  c_intair: number;
  c_into2: number;
  ssid: string;
  password: string;
};

type TBroadcastMessages =
  | TMessageBroadcast
  | TConfigModeMessage
  | TValveConfigMessage
  | TSaveConfigMessage;

export type TResponseBroadcast = {
  cmd: 'status' | null;
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

type TResponseConfigMode = {cmd: 'configuring'; mac: string};

type TResponseValveConfig = {cmd: 'valvecfgdone'};

type TResponseSaveConfig = {
  cmd: 'cfgack';
  req: 'config';
  seq: number;
  mac: string;
};

export type TBroadcastResponses =
  | TResponseBroadcast
  | TResponseConfigMode
  | TResponseValveConfig
  | TMessageBroadcast
  | TResponseSaveConfig;
