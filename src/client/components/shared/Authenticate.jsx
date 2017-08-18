import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FLASHMESSAGE_ADD } from '../../redux/flashMessage';

// export default function (ComposedComponent) {
//   const Authenticate = props => (
//     <ComposedComponent {...props} />
//   );
//   Authenticate.propTypes = {
//     isAuthenticated: PropTypes.bool.isRequired,
//   };
//   return connect(state => ({
//     isAuthenticated: state.AUTH_LOGIN.isAuthenticated,
//   }))(Authenticate);
// }

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    // -- life cycle hooks
    // similar to mounting in constructor but advise to mount on this function
    // initializes every time component is loaded; is not run after rendering
    // look at the following for more details
    // https://facebook.github.io/react/docs/react-component.html#componentwillmount
    componentWillMount() {
      console.log('componentWillMount ran');
      if (!this.props.isAuthenticated) {
        console.log('componentWillMount in if');
        this.props.FLASHMESSAGE_ADD({
          type: 'error',
          text: 'Please Login',
        });
        this.props.history.push('/api/auth/login');
      }
    }
    // run everytime before rendering
    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.props.history.push('/api/auth/login');
      }
    }
    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }
  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    FLASHMESSAGE_ADD: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  return connect(state => ({
    isAuthenticated: state.AUTH_LOGIN.isAuthenticated,
  }), {
    FLASHMESSAGE_ADD,
  })(Authenticate);
}
