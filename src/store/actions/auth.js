import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expiry) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expiry * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwUbckY4i99xcXwimtQqKlKttrSJDfU0s";
    // change url to Sign in auth end point if the auth mode is not sign up
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwUbckY4i99xcXwimtQqKlKttrSJDfU0s";
    }
    axios
      .post(url, authData)
      .then((response) => {
        // save token and userid in localstorage
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        // save the expiration information also
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    const userId = localStorage.getItem("userId");
    if (!token) {
      dispatch(logout());
    } else {
      if (expirationDate > new Date()) {
        
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000)
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
