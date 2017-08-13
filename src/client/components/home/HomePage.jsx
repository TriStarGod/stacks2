import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';

// import { mapDispatchToProps } from '../../redux/actions/progress';
import { mapDispatchToProps } from '../../redux/progress';
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
    const { PROGRESS_INCREMENT, PROGRESS_DECREMENT } = this.props;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <Button onClick={PROGRESS_INCREMENT}>Increment</Button> &nbsp;
          <Button onClick={PROGRESS_DECREMENT}>Decrement</Button>
        </div>
        <Sidebar />
      </div>
    );
  }
}
// null is needed for mapStateToProps which isn't used the following code
export default connect(null, mapDispatchToProps)(HomePage);
