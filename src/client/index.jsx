import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { render } from 'react-dom';

// CSS from a module
import 'bootstrap/dist/css/bootstrap.css';
// CSS from a local file
import './css/musiclist.scss';

// Default export from a local file
import DevTools from './components/utils/DevTools';
import setAuthToken from './utils/setAuthToken';
import store from './redux/store';
// import TestComponent from './testcomponent';
import Base from './components/Base';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <div>
          <Component />
          {/* <DevTools /> */}
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('#app'),
  );
};
// ran so site can restore token on client browser refresh
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
}
// run first time app runs
renderApp(Base);
// called when a change happens
if (module && module.hot) {
  module.hot.accept('./components/Base', () => {
    // eslint-disable-next-line global-require
    const NextBase = require('./components/Base').default;
    renderApp(NextBase);
  });
}
