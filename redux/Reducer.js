import {SET_STORED_WIFI} from './actions/Storage';
import {
  VENT_DATA,
  VENT_CONFIG_MODE,
  VENT_IS_TESTING,
  VENT_IS_SAVED,
} from './actions/Vent';
import {
  SET_CURRENT_WIFI,
  SET_DEFAULT_WIFI,
  STAY_CURRENT_WIFI,
} from './actions/Wifi';

const initialState = {
  storedWifi: [],
  defaultWifi: null,
  mac: null,
  ip: null,
  name: null,
  isConnected: false,
  isConfigMode: false,
  isTesting: false,
  isSaved: false,
  currentWifi: null,
  configWifi: null,
  stayCurrent: false,
  broadcastInit: false,
};

const Reducer = (state = initialState, action) => {
  const type = action.type;
  console.log('reducer ===>', action);
  switch (type) {
    case SET_STORED_WIFI:
      const storedWifi = [...state.storedWifi];
      storedWifi.push(action.data);
      return {
        ...state,
        storedWifi,
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
    case SET_DEFAULT_WIFI:
      return {
        ...state,
        defaultWifi: action.ssid,
      };
    case STAY_CURRENT_WIFI:
      return {
        ...state,
        stayCurrent: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
