import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlashMessage from './FlashMessage';
import { FLASHMESSAGE_DELETE } from '../../redux/flashMessage';

// class FlashMessagesList extends React.Component {
//   render() {
//     const messages = this.props.messages.map(message => 
//       <FlashMEssage key={message.id} message={message} />);
//     return (
//       <div>{messages}</div>
//     );
//   }
// }

function FlashMessagesList(props) {
  const messages = props.FLASHMESSAGES
    .map(message =>
      (<FlashMessage
        FLASHMESSAGE_DELETE={props.FLASHMESSAGE_DELETE}
        key={message.id}
        message={message}
      />));
  return (
    <div>{messages}</div>
  );
}

FlashMessagesList.propTypes = {
  FLASHMESSAGES: PropTypes.array.isRequired,
  FLASHMESSAGE_DELETE: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    FLASHMESSAGES: state.FLASHMESSAGES,
  };
}

export default connect(mapStateToProps, { FLASHMESSAGE_DELETE })(FlashMessagesList);
