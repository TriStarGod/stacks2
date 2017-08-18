import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import map from 'lodash/map';

import FormGroupText from '../shared/FormGroupText';
import { TASK_ADD, TASK_UPDATE } from '../../redux/task';

const roles = [
  'Level 0',
  '.Level 1',
  '..Level 2',
  '...Level 3',
  '....Level 4',
];
class EditorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      data0: '',
      taskId: 0,
      dropdownOpen: false,
      currentValue: '.Level 1',
      isLoading: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmitTaskUpdate = this.onSubmitTaskUpdate.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  onClick(e) {
    this.setState({
      currentValue: e.currentTarget.textContent,
    });
  }
  onSubmitTaskUpdate(e) {
    e.preventDefault();
    // this.props.TASK_UPDATE(this.state);
    this.props.TASK_ADD(this.state); // for testing
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  render() {
    const options = map(roles, value =>
      <DropdownItem key={value} onClick={this.onClick}>{value}</DropdownItem>,
    );
    const { errors, data0, isLoading } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Label for="current">Current: </Label>
              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                  {this.state.currentValue}
                </DropdownToggle>
                <DropdownMenu>
                  {options}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Form onSubmit={this.onSubmitTaskUpdate}>
                <FormGroupText
                  id="data0"
                  value={data0}
                  error={errors.data0}
                  label="Data 0"
                  onChange={this.onChange}
                />
                <Button disabled={isLoading}>Save</Button>
              </Form>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Data 0 Label</th>
                    <th>Date 1 Label</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Data 0 data</td>
                    <td>Date 1 data</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Data 0 data</td>
                    <td>Date 1 data</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
        <footer className="footer navbar-fixed-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Button className="float-right">
                  UP
                </Button>
                <Button className="float-right">
                  EDIT
                </Button>
                <Button className="float-right">
                  ADD
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

EditorPage.propTypes = {
  TASK_ADD: PropTypes.func.isRequired,
  TASK_UPDATE: PropTypes.func.isRequired,
};

export default connect(null, { TASK_ADD, TASK_UPDATE })(EditorPage);
