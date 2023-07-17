import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './userActionType'


const initialState = {
    Alluser: [],
    loading: false,
    error: null,
  };

  
export const getuserReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case  LOGIN_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          Alluser: action.payload,
          loading: false,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          Alluser: [],
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };