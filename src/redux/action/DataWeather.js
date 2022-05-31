import * as actionTypes from '../constants/ActionType'
import { DataWeather } from '../../service/GetData'
export const getDataStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await DataWeather('Ha Noi')
            dispatch({
                type: actionTypes.GET_DATA_START,
                payload: res.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}
export const getDataWithAddress = (address) => {
    return async (dispatch, getState) => {
        try {
            let res = await DataWeather(address)
            dispatch({
                type: actionTypes.GET_DATA_WITH_LOCATION,
                payload: res.data
            })
        } catch (e) {
            console.log(e);
        }
    }
}