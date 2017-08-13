import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import map from 'lodash/map';

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
      taskId: 0,
      dropdownOpen: false,
      currentValue: '.Level 1',
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  onClick(e) {
    this.setState({
      currentValue: e.currentTarget.textContent,
    });
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
              <Form>
                <FormGroup>
                  <Label for="data0">Data 0</Label>
                  <Input type="textarea" name="data0" id="data0" />
                </FormGroup>
                <FormGroup>
                  <Label for="data1">Data 1</Label>
                  <Input type="textarea" name="data1" id="data1" />
                </FormGroup>
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

EditorPage.propTypes = {};

export default EditorPage;
