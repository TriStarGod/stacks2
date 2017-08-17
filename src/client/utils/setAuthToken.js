import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import jwt from 'jsonwebtoken';

// import store from '../redux/store'; // correct but not needed since dispatch
import { AUTH_SET_USER } from '../redux/auth';

export default function setAuthToken(dispatch, token) {
  // set token in Authorization key (I think it gets created?)
  // delete if token is empty / false
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    dispatch(AUTH_SET_USER(jwtDecode(localStorage.jwtToken)));
  } else {
    delete axios.defaults.headers.common.Authorization;
    dispatch(AUTH_SET_USER());
  }
}
