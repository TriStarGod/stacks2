// combineReducers combines all the reducers into one reducer
// createStore turns the single reducer into a store
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { logger } from 'redux-logger'; // logs every action to console and shows app state before and after its applied
import thunk from 'redux-thunk';

import DevTools from '../components/utils/DevTools';
// get progress reducer
import { PROGRESS_REDUCER } from './progress';
import { AUTH_REGISTER_REDUCER, AUTH_LOGIN_REDUCER } from './auth';
import { FLASHMESSAGE_REDUCER } from './flashMessage';

// combine the reducers into one "root" reducer
const combinedReducers = combineReducers({
  PROGRESS: PROGRESS_REDUCER,
  AUTH_REGISTER: AUTH_REGISTER_REDUCER,
  AUTH_LOGIN: AUTH_LOGIN_REDUCER,
  FLASHMESSAGE: FLASHMESSAGE_REDUCER,
});
const enhancer = compose(
  applyMiddleware(logger, thunk),
  // DevTools.instrument(),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export default function configureStore(initialStore) {
  const store = createStore(combinedReducers, initialStore, enhancer);
  // // Hot reload reducers
  // if (module.hot) {
  //   module.hot.accept('./progress', () =>
  //     store.replaceReducer(PROGRESS_REDUCER),
  //   );
  //   module.hot.accept('./auth', () =>
  //     store.replaceReducer(AUTH_REGISTER_REDUCER),
  //   );
  //   module.hot.accept('./auth', () =>
  //     store.replaceReducer(AUTH_LOGIN_REDUCER),
  //   );
  // }
  return store;
}
