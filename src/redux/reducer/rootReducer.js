import { homeReducer } from './homeReducer'
import { combineReducers } from "redux";
import { loginReducer } from './loginReducer'

const rootReducer = combineReducers({
    home: homeReducer,
    login: loginReducer
})

export default rootReducer;