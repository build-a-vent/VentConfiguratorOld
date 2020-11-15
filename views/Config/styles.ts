import {Dimensions, StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  saveButton: {
    position: 'absolute',
    bottom: 35,
    left: 5,
    right: 5,
  },
  view: {
    height: Dimensions.get('window').height,
  },
});

export default styles;
