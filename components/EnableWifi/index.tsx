import React from 'react';
import {Button, Modal, Text, View} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {RootState} from '../../store';
import {setProgress} from '../../store/app/action';
import styles from './styles';
type MyProps = {
  isWifi: boolean;
  isProgress: boolean;
  switchWifi: boolean;
};

type PropsEnableWifi = MyProps & ReturnType<typeof mapDispatchToEnableWifi>;

const EnableWifi: React.FunctionComponent<PropsEnableWifi> = (props) => {
  if (
    props.isWifi === true ||
    props.isProgress === true ||
    props.switchWifi === true
  )
    return <></>;

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.wrapper}>
        <Text style={styles.message}>Wifi is disabled</Text>
        <Button
          title="Enable wifi"
          onPress={() => {
            props.setProgress(true, 'Enable wifi');
            WifiManager.setEnabled(true);
          }}
        />
      </View>
    </Modal>
  );
};

const mapDispatchToEnableWifi = (dispatch: Dispatch) => ({
  setProgress: (progress: boolean, message: string | null) =>
    dispatch(setProgress(progress, message)),
});

const mapStateToEnableWifi = (state: RootState) => ({
  isWifi: state.app.isConnected,
  switchWifi: state.app.switchWifi,
  isProgress: state.app.progress,
});

export default connect(
  mapStateToEnableWifi,
  mapDispatchToEnableWifi,
)(EnableWifi);
