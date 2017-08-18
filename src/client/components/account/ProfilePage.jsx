import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form } from 'reactstrap';

import FormGroupText from '../shared/FormGroupText';
import Sidebar from '../shared/Sidebar';

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      title: '',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
  }
  render() {
    const { match, errors, title, isLoading } = this.state;
    return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <h4>This is the profile page. The profile id is: {match}</h4>
          <Form onSubmit={this.onSubmit}>
            <FormGroupText
              id="title"
              value={title}
              error={errors.title}
              label="Title"
              onChange={this.onChange}
            />
            <Button disabled={isLoading}>Save</Button>
          </Form>
        </div>
        <Sidebar />
      </div>
    );
  }
}

// function ProfilePage({ match }) {
//   return (
//     <div className="row">
//       <div className="col-sm-12 col-md-8">
//         This is the profile page. The profile id is: {match.params.id}
//       </div>
//       <Sidebar />
//     </div>
//   );
// }

export default connect()(ProfilePage);
