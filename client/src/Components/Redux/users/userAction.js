import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './userActionType'

const API_URL = "http://localhost:4500/getUser";

export const getUsers = (data) => {
  return (dispatch) => {
    dispatch(getUserRequest());
    axios
      .get(API_URL)
      .then((response) => {
        console.log("responsedataUsergetsucess",response.data);
        dispatch(getUserSuccess(response.data.Alluser));
      })
      .catch((error) => {
        dispatch(getUserFailure(error.message));
      });
  };
};

export const getUserRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const getUserSuccess = (payload) => {
  console.log("payloadofgetsucces",payload)
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const getUserFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// export const fetchLatestMovies = () => {
//   return (dispatch) => {
//     axios
//       .get(API_URL)
//       .then((response) => {
//         dispatch(getLatestMoviesSuccess(response.data));
//       })
//       .catch((error) => {
//         dispatch(latestMoviesFailure(error.message));
//       });
//   };
// };

// export const getLatestMoviesSuccess = (movies) => {
//   return {
//     type: GET_LATEST_MOVIES_SUCCESS,
//     payload: movies,
//   };
// };

// export const latestMoviesFailure = (error) => {
//   return {
//     type: LATEST_MOVIES_FAILURE,
//     payload: error,
//   };
// };