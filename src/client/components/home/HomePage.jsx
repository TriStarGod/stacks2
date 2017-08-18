import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PROGRESS_INCREMENT, PROGRESS_DECREMENT } from '../../redux/progress';
import Sidebar from '../shared/Sidebar';

// function HomePage({ decrementProgress, incrementProgress }) {
//   return (
//     <div className="row">
//       <div className="col-sm-12 col-md-8">
//         <Button onClick={incrementProgress}>Increment</Button> &nbsp;
//         <Button onClick={decrementProgress}>Decrement</Button>
//       </div>
//       <Sidebar />
//     </div>
//   );
// }
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hi',
    };
  }
  render() {
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <Button onClick={this.props.PROGRESS_INCREMENT}>Increment</Button> &nbsp;
          <Button onClick={this.props.PROGRESS_DECREMENT}>Decrement</Button>
        </div>
        <Sidebar />
      </div>
    );
  }
}

HomePage.propTypes = {
  PROGRESS_INCREMENT: PropTypes.func.isRequired,
  PROGRESS_DECREMENT: PropTypes.func.isRequired,
};

// null is needed for mapStateToProps which isn't used the following code
export default connect(null, { PROGRESS_INCREMENT, PROGRESS_DECREMENT })(HomePage);
