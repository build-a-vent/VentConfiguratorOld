export const VENT_DATA = 'VENT_DATA';

export const setVentData = (response) => ({
  type: VENT_DATA,
  response,
});

export const VENT_CONFIG_MODE = 'VENT_CONFIG_MODE';

export const setConfigMode = (mode) => ({
  type: VENT_CONFIG_MODE,
  mode,
});

export const VENT_IS_TESTING = 'VENT_IS_TESTING';

export const setVentTesting = (state) => ({
  type: VENT_IS_TESTING,
  state,
});

export const VENT_IS_SAVED = 'VENT_IS_SAVED';

export const setVentSaved = () => ({
  type: VENT_IS_SAVED,
});
