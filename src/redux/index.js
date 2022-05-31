import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { GetDataReducer } from '../redux/reducer/GetDataReducer'

const reducer = combineReducers({
    dataWeather: GetDataReducer,
})
const middleware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store