import {StyleSheet} from 'react-native';
import {padding} from './../../constants/dimensions';

export default StyleSheet.create({
  wrapper: {
    height: '100%',
  },
  rescanButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    right: 10,
  },
  list: {
    padding,
  },
  item: {
    height: 50,
    borderBottomWidth: 1,
  },
  itemText: {
    lineHeight: 40,
    fontSize: 16,
  },
  hidden: {
    display: 'none',
  },
  active: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
