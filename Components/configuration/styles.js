import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
const LINE_HEIGHT = 40;
const FONT_SIZE = 18;

export const configStyles = {
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE,
    alignSelf: 'flex-start',
    width: 165,
    lineHeight: LINE_HEIGHT,
  },
  help: (editable) => ({
    fontSize: 12,
    marginBottom: 10,
    width: '100%',
    display: editable === false ? 'none' : null,
  }),
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    alignSelf: 'flex-end',
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  button: {
    width: '100%',
  },
  valueSet: {
    color: '#a4c936',
    lineHeight: LINE_HEIGHT,
    fontSize: FONT_SIZE,
    fontWeight: 'bold',
  },
  inputWrapper: {
    flex: 1,
    lineHeight: LINE_HEIGHT,
    flexDirection: 'row',
  },
  inputUnit: {
    borderWidth: 1,
    width: 100,
    padding: 5,
  },
  unit: {
    lineHeight: LINE_HEIGHT,
    fontSize: FONT_SIZE,
  },
  spacer: {
    width: '100%',
    height: 10,
  },
};
