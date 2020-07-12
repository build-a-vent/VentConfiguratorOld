import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {stayCurrentWifi, setCurrentWifi} from '../../redux/actions/Wifi';
import WifiManager from 'react-native-wifi-reborn';

const connectWifi = (defaultSsid, networks, cb) => {
  const connectionData = networks.find((data) => data.ssid === defaultSsid);
  WifiManager.connectToProtectedSSID(
    connectionData.ssid,
    connectionData.password,
    true,
  ).then(() => {
    cb(defaultSsid);
  });
};

const ConnectDefault = (props) => {
  if (props.defaultWifi === null && props.stayCurrent === false) return null;

  return (
    <View>
      <Text style={styles.headline}>You are not in you default Network</Text>
      <Text style={styles.text}>
        If you are in your default networks the app have the best environment to
        work
      </Text>
      <View style={styles.buttonGroup}>
        <View style={styles.buttonWrapper}>
          <Button title="OK" onPress={() => props.stayCurrentWifi()} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title="switch"
            color="#a4c936"
            onPress={() =>
              connectWifi(
                props.defaultWifi,
                props.storedWifi,
                props.setCurrentWifi,
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      stayCurrentWifi,
      setCurrentWifi,
    },
    dispatch,
  );

const mapStateToProps = (state) => ({
  currentWifi: state.currentWifi,
  defaultWifi: state.defaultWifi,
  stayCurrent: state.stayCurrent,
  storedWifi: state.storedWifi,
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDefault);

const styles = StyleSheet.create({
  buttonWrapper: {
    padding: 5,
    width: '50%',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  headline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  text: {
    padding: 5,
    marginBottom: 20,
  },
});
