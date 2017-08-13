import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './shared/Header';
import HomePage from './home/HomePage';
import TaskEditorPage from './task/EditorPage';
import ProfilePage from './account/ProfilePage';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';

// Only when the specific path is used, it will render the specific page
// the exact prop in the HomePage is used to only activate it for / and not /a
// by not setting the prop exact, fuzzy matches can occur 
// like /account/profile/some/thing would work for the second route
function Base(props) {
  return (
    <Router>
      <div className="wrapper">
        <Header username="anonymous" />
        {/* <p>{props.PROGRESS}</p> */}
        <section className="page-content container-fluid">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/api/auth/login" component={LoginPage} />
          <Route exact path="/api/auth/register" component={RegisterPage} />
          <Route path="/api/profile/:id" component={ProfilePage} />
          <Route path="/task/editor/:id" component={TaskEditorPage} />
        </section>
      </div>
    </Router>
  );
}

// maps the state to the props of the component
function mapStateToProps(state) {
  return {
    ...state,
  };
}
// connect binds the app state to the component's props
// this won't overwrite other props sent from higher level components
// this will also cause the component to re-render on every app state change
export default connect(mapStateToProps)(Base);
