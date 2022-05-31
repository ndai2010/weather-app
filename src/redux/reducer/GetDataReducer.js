import * as actionTypes from '../constants/ActionType'
const initState = {

}
export const GetDataReducer = (state = initState, actions) => {
    switch (actions.type) {
        case actionTypes.GET_DATA_START:
            state = actions.payload;
            return {
                ...state
            }
        case actionTypes.GET_DATA_WITH_LOCATION:
            state = actions.payload;
            return {
                ...state
            }
        case actionTypes.GET_DATA_FAIL:
            let deleteMessage = actions.payload
            state.deleteMessage = deleteMessage
            return state.deleteMessage
        default:
            return state;
    }
}