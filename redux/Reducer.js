import { SET_STORED_WIFI } from "./actions/Storage";

const initialState = {
    wifi: null,
}

const Reducer = (state = initialState, action) => {

    const type = action.type;
    console.log(action)

    switch (type) {

        case SET_STORED_WIFI:
            return {
                ...state,
                wifi: action.wifi
            }

        default:
            return {
                ...state
            }

    }

}


export default Reducer;
