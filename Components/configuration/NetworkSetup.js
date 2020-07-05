import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {configStyles} from './styles';
import {TextInput} from 'react-native-gesture-handler';

const NetworkSetup = (props) => {
  if (props.step < props.active) {
    return null;
  }
  return (
    <View>
      <Text style={styles.label}>SSID</Text>
      <TextInput
        style={styles.input(props.editable)}
        defaultValue=""
        value={props.ssid}
        onChangeText={props.onSsidChange}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input(props.editable)}
        defaultValue=""
        value={props.password}
        onChangeText={props.onPasswordChange}
      />

      <View style={styles.buttonWrapper(props.step === props.active)}>
        <Button
          title="Set Network"
          disabled={!(props.ssid?.length > 2 && props.password?.length > 5)}
          color="green"
          onPress={props.onSave}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create(configStyles);

export default NetworkSetup;
