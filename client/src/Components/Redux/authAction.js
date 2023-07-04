import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from './authActionType'

const API_URL = "http://localhost:4300/addUser";

export const PostUsers = (data) => {
  return (dispatch) => {
    dispatch(postUserRequest());
    axios
      .post(API_URL,data)
      .then((response) => {
        console.log("responsedata",response.data.users);
        dispatch(postUserSuccess(response.data.users));
      })
      .catch((error) => {
        dispatch(postUserFailure(error.message));
      });
  };
};

export const postUserRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const postUserSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const postUserFailure = (error) => {
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