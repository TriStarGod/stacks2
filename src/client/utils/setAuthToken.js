import axios from 'axios';
import jwt from 'jsonwebtoken';

import store from '../redux/store';
import { AUTH_LOGIN_SUCCESS } from '../redux/auth';

export default function setAuthToken(token) {
  // set token in Authorization key (I think it gets created?)
  // delete if token is empty / false
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    store.dispatch(AUTH_LOGIN_SUCCESS(jwt.decode(localStorage.jwtToken)));
  } else {
    delete axios.defaults.headers.common.Authorization;
    store.dispatch(AUTH_LOGIN_SUCCESS());
  }
}
