import React from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import {MAX_NAME_LENGTH} from '../../constants/App';
import {configStyles} from './styles';

const VentNameInput = (props) => {
  if (props.editable === false) {
    return null;
  }

  return (
    <TextInput
      style={styles.input}
      autoCompleteType="off"
      autoCapitalize="words"
      autoCorrect={false}
      autoFocus={true}
      value={props.value}
      maxLength={MAX_NAME_LENGTH}
      defaultValue={props.defaultValue}
      onChangeText={(text) => props.onChange(text)}
      editable={props.editable}
    />
  );
};

const ValueText = (props) => {
  if (props.editable === true) {
    return null;
  }
  return <Text style={styles.valueSet}>{props.value}</Text>;
};

const SaveButton = (props) => {
  if (props.editable === false) {
    return null;
  }

  return (
    <View style={styles.button}>
      <Button
        title="Set name"
        disabled={
          props.value === false || props.value.trim().length < 5 ? true : false
        }
        color="#a4c936"
        onPress={() => props.onPress()}
      />
    </View>
  );
};

const NameInput = (props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Vent name</Text>
      <VentNameInput {...props} />
      <ValueText {...props} />
      <Text style={styles.help(props.editable)}>
        The name will displayed in the vent manager app (min length 5)
      </Text>
      <SaveButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create(configStyles);

export default NameInput;
