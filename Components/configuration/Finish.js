import React from 'react';
import {View, Button} from 'react-native';

const Finish = (props) => {
  if (props.step < props.active) {
    return null;
  }
  return (
    <View>
      <Button
        title="Update Vent"
        color="green"
        onPress={props.onPress}></Button>
    </View>
  );
};

export default Finish;
