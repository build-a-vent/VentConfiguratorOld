import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {
  ACTIVITY_INDICATOR_LAGRE,
  ACTIVITY_INDICATOR_COLOR,
} from '../../constants/App';

const { height, width } = Dimensions.get('window');

const Backdrop = (props) => {
  if (props.isOpen === false) {
    return null;
  }

  return (
    <View style={styles.backdrop}>
      <View style={styles.indicator}>
        <ActivityIndicator
          size={ACTIVITY_INDICATOR_LAGRE}
          color={ACTIVITY_INDICATOR_COLOR}
        />
        <Text style={styles.indicatorText}>{props?.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
    backgroundColor: 'rgba(33,37,41, .4)',
    zIndex: 999999999,
  },
  indicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 300,
    height: 120,
    transform: [{ translateY: -60 }, { translateX: -150 }],
    zIndex: 2,
  },
  indicatorText: {
    textAlign: 'center',
  },
});

export default Backdrop;
