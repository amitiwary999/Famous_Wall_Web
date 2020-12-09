import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import { loginReducer } from './loginReducer';
import { profileReducer } from './profileReducer';

const rootReducer = combineReducers({
  home: homeReducer,
  login: loginReducer,
  selfProfile: profileReducer,
});

export default rootReducer;
