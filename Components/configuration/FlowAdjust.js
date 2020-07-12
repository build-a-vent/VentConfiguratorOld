import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {configStyles} from './styles';

const Input = (props) => {
  if (props.editable === false) {
    return null;
  }

  return (
    <View style={configStyles.inputWrapper}>
      <TextInput
        style={configStyles.inputUnit}
        defaultValue=""
        autoCompleteType="off"
        autoFocus={false}
        value={props.value}
        editable={props.editable}
        onChangeText={props.onChange}
        keyboardType="decimal-pad"
      />
      <Text style={configStyles.unit}> ml</Text>
    </View>
  );
};

const ValueText = (props) => {
  if (props.editable === true) {
    return null;
  }
  return <Text style={styles.valueSet}>{props.value} ml</Text>;
};

const ButtonBar = (props) => {
  if (props.editable === false) {
    return null;
  }

  return (
    <View style={styles.button}>
      <Button
        title={props.actionButton.title}
        onPress={props.actionButton.onPress}
      />
      <View style={{height: 10}} />
      <Button
        title="Save"
        disabled={
          !(props.value > props.minValue && props.value < props.maxValue)
        }
        color="#a4c936"
        onPress={props.onSave}
      />
    </View>
  );
};

const FlowAdjust = (props) => {
  if (props.step < props.active) {
    return null;
  }

  try {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{props.title}</Text>
        <Input {...props} />
        <ValueText {...props} />
        <View style={styles.buttonWrapper}>
          <ButtonBar {...props} />
        </View>
      </View>
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

const styles = StyleSheet.create(configStyles);

export default FlowAdjust;
