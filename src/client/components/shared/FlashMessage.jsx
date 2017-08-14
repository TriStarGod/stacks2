import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.FLASHMESSAGE_DELETE(this.props.message.id);
  }
  render() {
    const { id, type, text } = this.props.message;
    return (
      <Alert color={
        type === 'success' ? 'success' : 
        type === 'error' ? 'danger' : ''}>
        {text}
        <Button onClick={this.onClick} className="close">&times;</Button>
      </Alert>
    );
  }
}

// function FlashMessage({ message }) {
//   const { id, type, text } = message;
//   return (
//     <Alert color={
//       type === 'success' ? 'success' : 
//       type === 'error' ? 'danger' : ''}>
//       {text}
//       <Button className="close">&times;</Button>
//     </Alert>
//   );
// }

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  FLASHMESSAGE_DELETE: PropTypes.func.isRequired,
};


export default FlashMessage;
