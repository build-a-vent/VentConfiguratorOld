import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import ActionButton from './ActionButton';

type TFlowInput = {
  value: string | null;
  label: string;
  type?: 'default' | 'number-pad';
  onPress?: () => void | undefined;
  onChangeText?: (text: string) => void;
};

const styles = StyleSheet.create({
  inputWrapper: {
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingBottom: 5,
  },
  labelWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  label: {
    width: '45%',
    marginRight: '5%',
    lineHeight: 30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 0,
    paddingLeft: 5,
    flex: 1,
  },
  button: {
    width: 60,
    marginLeft: 10,
    borderWidth: 1,
  },
});

const FlowInput: React.FunctionComponent<TFlowInput> = ({
  value,
  label,
  type = 'number-pad',
  onPress = undefined,
  onChangeText = (value: string) => {},
}) => {
  return (
    <>
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={{...styles.input, width: onPress ? 'auto' : '50%'}}
          keyboardType={type}
          value={value ?? ''}
          onChangeText={(text) => onChangeText(text)}
        />
        <ActionButton onPress={onPress} disabled={false} />
      </View>
    </>
  );
};

export default FlowInput;
