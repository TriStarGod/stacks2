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
import DevToools from './components/utils/DevTools';
import configureStore from './redux/store';
// import TestComponent from './testcomponent';
import Base from './components/Base';

const Store = configureStore();

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Provider store={Store}>
        <div>
          <Component />
          <DevToools />
        </div>
      </Provider>
    </AppContainer>,
    document.querySelector('#app'),
  );
};
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
