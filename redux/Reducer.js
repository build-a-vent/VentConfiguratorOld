import {SET_STORED_WIFI} from './actions/Storage';
import {VENT_DATA, VENT_CONFIG_MODE, VENT_IS_TESTING} from './actions/Vent';

const initialState = {
  wifi: null,
  mac: null,
  ip: null,
  name: null,
  isConnected: false,
  isConfigMode: false,
  isTesting: false,
  isSaved: false,
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
        isConfigMode: action.mode,
      };
    case VENT_IS_TESTING:
      return {
        ...state,
        isTesting: action.state,
      };
    default:
      return {
        ...state,
      };
  }
};

export default Reducer;
