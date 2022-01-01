import { combineReducers } from "redux";
import auth from './auth_reducer'
import profile from './profile_reducer'


export default combineReducers({
    auth:auth,
    profile:profile
})