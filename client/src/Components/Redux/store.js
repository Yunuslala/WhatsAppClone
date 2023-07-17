import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { userReducer } from './auth/reducer'
import {getuserReducer} from './users/userReducer'
const rootReducer = combineReducers({
    userReducer,
    getuserReducer
  });



export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));