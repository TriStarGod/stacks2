import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Button } from 'reactstrap';

class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    this.timer = setInterval(() => this.onClick(), 7000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
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
  message: PropTypes.shape({
    id: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  FLASHMESSAGE_DELETE: PropTypes.func.isRequired,
};


export default FlashMessage;
