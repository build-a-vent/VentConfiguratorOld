import {Dimensions, StyleSheet} from 'react-native';
import {backGroundColor} from '../../constants/styles';
import {padding} from './../../constants/dimensions';

const width = 300;
export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    borderColor: 'black',
    backgroundColor: backGroundColor,
    width,
    height: 140,
    left: Dimensions.get('window').width / 2 - width / 2,
    top: 80,
    borderWidth: 1,
    padding,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
