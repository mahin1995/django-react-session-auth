/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS
} from "../actions/type";

const intialState = {
  isAuthenticated: null,
  username: "",

};
export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATED_SUCCESS:
    case AUTHENTICATED_FAIL:
        return{
            ...state,
            isAuthenticated:payload
        }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: payload,
      };
    case LOGOUT_SUCCESS:
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
      };
    case DELETE_USER_FAIL:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return state;
    default:
      return state;
  }
}
