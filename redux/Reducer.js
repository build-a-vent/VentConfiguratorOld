import {SET_STORED_WIFI} from './actions/Storage';
import {
  VENT_DATA,
  VENT_CONFIG_MODE,
  VENT_IS_TESTING,
  VENT_IS_SAVED,
} from './actions/Vent';
import {SET_CURRENT_WIFI} from './actions/Wifi';

const initialState = {
  wifi: null,
  mac: null,
  ip: null,
  name: null,
  isConnected: false,
  isConfigMode: false,
  isTesting: false,
  isSaved: false,
  currentWifi: null,
  configWifi: null,
};

const Reducer = (state = initialState, action) => {
  const type = action.type;
  console.log(action);
  switch (type) {
    case SET_STORED_WIFI:
      return {
        ...state,
        wifi: action.wifi,
      };

    case VENT_DATA:
      return {
        ...state,
        ...action.response,
      };
    case VENT_CONFIG_MODE:
      return {
        ...state,
        isSaved: false,
        isTesting: false,
        isConfigMode: action.mode,
      };
    case VENT_IS_TESTING:
      return {
        ...state,
        isTesting: action.state,
      };
    case SET_CURRENT_WIFI:
      return {
        ...state,
        currentWifi: action.ssid,
      };
    case VENT_IS_SAVED:
      return {
        ...state,
        isSaved: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
