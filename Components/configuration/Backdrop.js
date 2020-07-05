import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  ACTIVITY_INICATOR_LAGRE,
  ACTIVITY_INDICATOR_COLOR,
} from '../../constants/App';

const {height, width} = Dimensions.get('window');

const Backdrop = (props) => {
  if (props.isOpen === false) {
    return null;
  }

  console.log('backdrop');
  return (
    <View style={styles.backdrop}>
      <View style={styles.wrapper}>
        <ActivityIndicator
          size={ACTIVITY_INICATOR_LAGRE}
          color={ACTIVITY_INDICATOR_COLOR}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: 'rgba(214, 214, 194, .7)',
    zIndex: 9999999,
  },
  wrapper: {
    width: ACTIVITY_INICATOR_LAGRE,
    height: ACTIVITY_INICATOR_LAGRE,
    position: 'absolute',
    left: width / 2 - ACTIVITY_INICATOR_LAGRE / 2,
    top: height / 2 - ACTIVITY_INICATOR_LAGRE / 2,
    zIndex: 99,
  },
});

export default Backdrop;
