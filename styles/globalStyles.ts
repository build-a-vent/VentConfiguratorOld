import {StyleSheet} from 'react-native';
import {Colors} from '../constants/styles';
import {padding} from './../constants/dimensions';
export default StyleSheet.create({
  header: {
    height: 40,
    backgroundColor: Colors.headerColor,

    padding,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
