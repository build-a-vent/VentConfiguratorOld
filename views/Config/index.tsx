import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useReducer, useState} from 'react';
import {BackHandler, Button, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootStackParamList} from '../../AppNavigator';
import FlowInput from '../../components/FlowInput';
import {
  configInputs,
  longTestingTime,
  shortTestingTime,
} from '../../constants/config';
import {closeSocket, createSocket, socketSend} from '../../Network/Socket';
import {TResponseBroadcast, TValveConfigAction} from '../../Network/Socket.d';
import {setProgress} from '../../store/app/action';
import globalStyles from '../../styles/globalStyles';
import styles from './styles';

type TWifiListScreenNavProps = StackNavigationProp<
  RootStackParamList,
  'Config'
>;

type MyProps = {
  route: {params: {ssid: string; connect: boolean}};
} & ReturnType<typeof mapDispatchToConfigProps>;

export type TState = {
  isInit: boolean;
} & TResponseBroadcast;

const shortTesting: TValveConfigAction[] = ['airone', 'o2one'];

interface ISetBroadcast {
  type: 'setBroadcast';
  payload: TResponseBroadcast;
}

interface IChangeValue {
  type: 'changeValue';
  payload: {key: keyof TState; value: unknown};
}

type TAction = ISetBroadcast | IChangeValue;

const initialState: TState = {
  isInit: false,
  cmd: null,
  c_pip: 0,
  c_lip: 0,
  c_pep: 0,
  c_lep: 0,
  c_flair: 0,
  c_flo2: 0,
  c_intair: 0,
  c_into2: 0,
  c_airt: 0,
  c_o2t: 0,
  c_inspt: 0,
  c_cyclt: 0,
  c_wtemp: 0,
  c_name: '',
  c_ssid: '',
  c_passwd: '',
  mac: '',
  a_pip: 0,
  a_eip: 0,
  a_eep: 0,
};

function reducer(state: TState, action: TAction): TState {
  switch (action.type) {
    case 'setBroadcast':
      return {
        ...state,
        ...action.payload,
      };
    case 'changeValue':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
}

const Config: React.FunctionComponent<MyProps> = (props) => {
  const navigation: TWifiListScreenNavProps = useNavigation();

  const [state, dispatch] = useReducer(reducer, initialState);
  const [init, setInit] = useState(false);

  const onTextChange = (value: unknown, key: keyof TState) => {
    dispatch({type: 'changeValue', payload: {key, value}});
  };

  const sendBroadcast = async () => {
    const result: TResponseBroadcast = await createSocket();
    dispatch({type: 'setBroadcast', payload: result});
    props.setProgress(true, 'Switch Vent in Config Mode');
    const mode = await socketSend({cmd: 'configmode', mac: result.mac});

    if (mode.req === 'configmode') {
      props.setProgress(false, '');
    }
  };

  const onTestPress = async (action: TValveConfigAction) => {
    const timer: Number =
      shortTesting.indexOf(action) === -1 ? longTestingTime : shortTestingTime;
    props.setProgress(true, 'Testing....');
    const tResult = await socketSend({
      cmd: 'valvecfg',
      mac: state.mac,
      action,
    });

    setTimeout(() => {
      props.setProgress(false, '');
    }, timer);
  };

  const saveVent = async () => {
    props.setProgress(true, 'Saving to Vent....');
    const sResponse = await socketSend({
      cmd: 'config',
      mac: state.mac,
      ventname: state.c_name,
      c_flair: state.c_flair,
      c_flo2: state.c_flo2,
      c_intair: state.c_intair,
      c_into2: state.c_into2,
      ssid: state.c_ssid,
      password: state.c_passwd,
    });

    if (sResponse.cmd === 'configack') {
      props.setProgress(true, 'Success...');
      setTimeout(() => {
        props.setProgress(false, '');
      }, 2000);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        closeSocket();
        navigation.navigate('Index');
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation]),
  );
  useEffect(() => {
    if (init === false) {
      sendBroadcast();
      setInit(true);
    }
  }, [init]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.view}>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerText}>
              Vent config: {state.mac}
            </Text>
          </View>
          <View style={{padding: 5}}>
            {configInputs.map((item) => (
              <FlowInput
                key={`conf-${item.key}`}
                value={state?.[item.key]?.toString() ?? ''}
                type={item.valueType === 'number' ? 'number-pad' : 'default'}
                label={item.label}
                onPress={
                  item.onPress !== undefined
                    ? () => {
                        if (item.onPress === undefined) return;
                        onTestPress(item.onPress);
                      }
                    : undefined
                }
                onChangeText={(ct: string) => {
                  let ctv: string | number = ct;
                  if (item.valueType === 'number') {
                    ctv = Number(ct);
                  }
                  onTextChange(ctv, item.key);
                }}
              />
            ))}
          </View>
          <View style={styles.saveButton}>
            <Button title="Save" onPress={() => saveVent()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapDispatchToConfigProps = (dispatch: Dispatch) => ({
  setProgress: (open: boolean, message: string) => {
    dispatch(setProgress(open, message));
  },
});

export default connect(null, mapDispatchToConfigProps)(Config);
