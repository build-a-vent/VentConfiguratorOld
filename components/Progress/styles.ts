import {Dimensions, StyleSheet} from 'react-native';
import {Colors} from './../../constants/styles';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  backdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: Colors.backdrop,
    bottom: 0,
  },
  message: {
    textAlign: 'center',
    height: 150,
    width: 300,
    position: 'absolute',
    top: height / 3 - 60,
    left: width / 2 - 150,
  },
  spinner: {
    margin: 'auto',
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
