import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { configStyles } from './styles';
import { TextInput } from 'react-native-gesture-handler';
import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';

const SaveButton = (props) => {
  if (props.editable === false) {
    return null;
  }
  return (
    <View style={styles.buttonWrapper}>
      <Button
        title="Set Network"
        disabled={
          Number(props.wifiIndex) === -1
            ? props.ssid?.length > 2 &&
              props.password?.length > 5 &&
              Number(props.wifiIndex) === -1
              ? false
              : true
            : false
        }
        color="#a4c936"
        onPress={props.onSave}
      />
    </View>
  );
};

const FormGroup = (props) => {
  if (Number(props.wifiIndex) !== -1) {
    return null;
  }
  return (
    <View style={configStyles.wrapper}>
      <Text style={configStyles.label}>SSID</Text>
      <TextInput
        style={configStyles.input}
        defaultValue=""
        value={props.ssid}
        onChangeText={props.onSsidChange}
      />
      <View style={configStyles.spacer}></View>
      <Text style={configStyles.label}>Password</Text>
      <TextInput
        secureTextEntry={true}
        password={true}
        style={configStyles.input}
        defaultValue=""
        value={props.password}
        onChangeText={props.onPasswordChange}
        textContentType="newPassword"
      />
      <View style={configStyles.spacer} />
      <Text style={configStyles.label}>Store Wifi</Text>

      <CheckBox
        onValueChange={props.onStoreChange}
        value={props.storeWifi}
        tintColors={{ true: '#a4c936' }}
      />
    </View>
  );
};

const NetworkSetup = (props) => {
  if (props.step < props.active) {
    return null;
  }

  return (
    <View>
      <Picker
        selectedValue={props.wifiIndex}
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue) => props.onWifiSelect(props.storedWifi[itemValue], itemValue)}>
        <Picker.Item label="Select a known wifi" value="-1" />
        {props.storedWifi.map((network, index) => (
          <Picker.Item label={network.ssid} value={index} />
        ))}
      </Picker>
      <FormGroup {...props} />

      <SaveButton {...props} />
    </View >
  );
};

const styles = StyleSheet.create(configStyles);

const mapStateToProps = (state) => ({ storedWifi: state.storedWifi });

export default connect(mapStateToProps)(NetworkSetup);
