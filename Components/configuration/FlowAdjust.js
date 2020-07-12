import React from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {configStyles} from './styles';

const FlowAdjust = (props) => {
  if (props.step < props.active) {
    return null;
  }

  try {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{props.title}</Text>

        <TextInput
          style={styles.input(props.editable)}
          defaultValue=""
          autoCompleteType="off"
          autoFocus={false}
          value={props.value}
          editable={props.editable}
          onChangeText={props.onChange}
          keyboardType="decimal-pad"
        />
        <View style={styles.buttonWrapper(props.step === props.active)}>
          <Button
            title={props.actionButton.title}
            onPress={props.actionButton.onPress}
          />
          <View style={styles.button}>
            <Button
              title="Save"
              disabled={
                !(props.value > props.minValue && props.value < props.maxValue)
              }
              color="green"
              onPress={props.onSave}
            />
          </View>
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
