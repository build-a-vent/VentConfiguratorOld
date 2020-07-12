import React from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {MAX_NAME_LENGTH} from '../../constants/App';
import {configStyles} from './styles';

const NameInput = (props) => {
  return (
    <View>
      <Text style={styles.label}>Vent name</Text>
      <TextInput
        style={styles.input(props.editable)}
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
      <Text style={styles.help(props.editable)}>
        The name will displayed in the vent manager app (min length 5)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create(configStyles);

export default NameInput;
