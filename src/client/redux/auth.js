// import { bindActionCreators } from 'redux';
import axios from 'axios';

export const AUTH_REGISTER_REQUEST = () => ({ type: 'AUTH_REGISTER_REQUEST' });
export const AUTH_REGISTER_SUCCESS = () => ({ type: 'AUTH_REGISTER_SUCCESS' });
export const AUTH_REGISTER_FAILURE = () => ({ type: 'AUTH_REGISTER_FAILURE' });
export function AUTH_REGISTER(Error, email, username, password, firstName, lastName, role) {
  return (dispatch) => {
    console.log(email);
    Error('');
    dispatch(AUTH_REGISTER_REQUEST());
    axios.post('/api/auth/register', {
      email,
      username,
      password,
      firstName,
      lastName,
      role,
    })
      .then(() => {
        // console.log('connected');
        // console.log(result);
        Error('');
        dispatch(AUTH_REGISTER_SUCCESS());
      })
      .catch((error) => {
        // console.log('error');
        // console.log(error);
        Error(error);
        dispatch(AUTH_REGISTER_FAILURE());
      });
  };
}

export function AUTH_REGISTER_REDUCER(state = { AUTH_REGISTER: 'Initial' }, action) {
  switch (action.type) {
    case 'AUTH_REGISTER_REQUEST': {
      return { ...state, AUTH_REGISTER: 'AUTH_REGISTER_REQUEST' };
    }
    case 'AUTH_REGISTER_SUCCESS': {
      return { ...state, AUTH_REGISTER: 'AUTH_REGISTER_SUCCESS' };
    }
    case 'AUTH_REGISTER_FAILURE': {
      return { ...state, AUTH_REGISTER: 'AUTH_REGISTER_FAILURE' };
    }
    default: {
      return state;
    }
  }
}

export const AUTH_LOGIN_REQUEST = () => ({ type: 'AUTH_LOGIN_REQUEST' });
export const AUTH_LOGIN_SUCCESS = () => ({ type: 'AUTH_LOGIN_SUCCESS' });
export const AUTH_LOGIN_FAILURE = () => ({ type: 'AUTH_LOGIN_FAILURE' });
export function AUTH_LOGIN(Error, username, password) {
  return (dispatch) => {
    // console.log(`this: ${this}`);
    // console.log(`login function ${username} ${password}`);
    Error('');
    dispatch(AUTH_LOGIN_REQUEST());
    axios.post('/api/auth/login', {
      username,
      password,
    })
      .then(() => {
        // console.log('connected');
        // console.log(res);
        Error('');
        dispatch(AUTH_LOGIN_SUCCESS());
      })
      .catch((error) => {
        // console.log('error');
        // console.log(error);
        Error(error);
        dispatch(AUTH_LOGIN_FAILURE());
      });
  };
}

export function AUTH_LOGIN_REDUCER(state = { AUTH_LOGIN: 'Initial' }, action) {
  switch (action.type) {
    case 'AUTH_LOGIN_REQUEST': {
      return { ...state, AUTH_LOGIN: 'AUTH_LOGIN_REQUEST' };
    }
    case 'AUTH_LOGIN_SUCCESS': {
      return { ...state, AUTH_LOGIN: 'AUTH_LOGIN_SUCCESS' };
    }
    case 'AUTH_LOGIN_FAILURE': {
      return { ...state, AUTH_LOGIN: 'AUTH_LOGIN_FAILURE' };
    }
    default: {
      return state;
    }
  }
}
// export default function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     AUTH_REGISTER_ASYNC,
//     AUTH_LOGIN_ASYNC,
//   }, dispatch);
// }
// export default function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     AUTH_REGISTER_REQUEST,
//     AUTH_REGISTER_SUCCESS,
//     AUTH_REGISTER_FAILURE,
//     AUTH_REGISTER_ASYNC,
//     AUTH_LOGIN_REQUEST,
//     AUTH_LOGIN_SUCCESS,
//     AUTH_LOGIN_FAILURE,
//     AUTH_LOGIN_ASYNC,
//   }, dispatch);
// }

// export const mapDispatchToProps = () => ({ AUTH_REGISTER_ASYNC, AUTH_LOGIN_ASYNC });
