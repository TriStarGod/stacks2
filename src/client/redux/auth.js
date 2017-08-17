// import { bindActionCreators } from 'redux';
import axios from 'axios';

const TYPE_AUTH_REGISTER_REQUEST = 'AUTH_REGISTER_REQUEST';
const TYPE_AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
const TYPE_AUTH_REGISTER_FAILURE = 'AUTH_REGISTER_FAILURE';

const AUTH_REGISTER_REQUEST = () => ({ type: TYPE_AUTH_REGISTER_REQUEST });
const AUTH_REGISTER_SUCCESS = () => ({ type: TYPE_AUTH_REGISTER_SUCCESS });
const AUTH_REGISTER_FAILURE = () => ({ type: TYPE_AUTH_REGISTER_FAILURE });
export function AUTH_REGISTER(successCB, errorCB, email, username, password,
  passwordConfirmation, firstName, lastName, role) {
  return (dispatch) => {
    // console.log(`Email: ${email}`);
    dispatch(AUTH_REGISTER_REQUEST());
    axios.post('/api/auth/register', {
      email,
      username,
      password,
      passwordConfirmation,
      firstName,
      lastName,
      role,
    })
      .then(() => {
        successCB();
        dispatch(AUTH_REGISTER_SUCCESS());
      })
      .catch((error) => {
        if (error.response) {
          errorCB(error.response.data);
        }
        dispatch(AUTH_REGISTER_FAILURE());
      });
  };
}

export function AUTH_REGISTER_REDUCER(state = { AUTH_REGISTER: 'Initial' }, action) {
  switch (action.type) {
    case TYPE_AUTH_REGISTER_REQUEST: {
      return { ...state, AUTH_REGISTER: TYPE_AUTH_REGISTER_REQUEST };
    }
    case TYPE_AUTH_REGISTER_SUCCESS: {
      return { ...state, AUTH_REGISTER: TYPE_AUTH_REGISTER_SUCCESS };
    }
    case TYPE_AUTH_REGISTER_FAILURE: {
      return { ...state, AUTH_REGISTER: TYPE_AUTH_REGISTER_FAILURE };
    }
    default: {
      return state;
    }
  }
}

export function AUTH_IF_EXISTS(id, value) {
  return dispatch => axios.get(`/api/auth/exists/${id}/${value}`);
}

const TYPE_AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
const TYPE_AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const TYPE_AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

const AUTH_LOGIN_REQUEST = () => ({ type: TYPE_AUTH_LOGIN_REQUEST });
const AUTH_LOGIN_SUCCESS = () => ({ type: TYPE_AUTH_LOGIN_SUCCESS });
const AUTH_LOGIN_FAILURE = () => ({ type: TYPE_AUTH_LOGIN_FAILURE });
export function AUTH_LOGIN(successCB, errorCB, email, password) {
  return (dispatch) => {
    dispatch(AUTH_LOGIN_REQUEST());
    axios.post('/api/auth/login', {
      email,
      password,
    })
      .then(() => {
        successCB();
        dispatch(AUTH_LOGIN_SUCCESS());
      })
      .catch(({ response }) => {
        if (response) {
          errorCB(response.data);
        }
        dispatch(AUTH_LOGIN_FAILURE());
      });
  };
}

export function AUTH_LOGIN_REDUCER(state = { AUTH_LOGIN: 'Initial' }, action) {
  switch (action.type) {
    case TYPE_AUTH_LOGIN_REQUEST: {
      return { ...state, AUTH_LOGIN: TYPE_AUTH_LOGIN_REQUEST };
    }
    case TYPE_AUTH_LOGIN_SUCCESS: {
      return { ...state, AUTH_LOGIN: TYPE_AUTH_LOGIN_SUCCESS };
    }
    case TYPE_AUTH_LOGIN_FAILURE: {
      return { ...state, AUTH_LOGIN: TYPE_AUTH_LOGIN_FAILURE };
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
