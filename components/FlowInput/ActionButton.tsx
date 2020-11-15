import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

type TMyProps = {
  onPress?: () => void | undefined;
  disabled: boolean;
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    marginLeft: 10,
    borderWidth: 1,
  },
});
const ActionButton: React.FunctionComponent<TMyProps> = (props) => {
  if (!props?.onPress || props.disabled === true) {
    return <></>;
  }
  return (
    <View style={styles.button}>
      <Button title="Test" onPress={props.onPress} disabled={props.disabled} />
    </View>
  );
};
export default ActionButton;
