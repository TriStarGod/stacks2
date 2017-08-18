import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux'; // DONT USE; it will cause components to rerender

import Authenticate from './shared/Authenticate';
import Header from './shared/Header';
import HomePage from './home/HomePage';
import TaskEditorPage from './task/EditorPage';
import ProfilePage from './account/ProfilePage';
import LoginPage from './account/LoginPage';
import RegisterPage from './account/RegisterPage';
import FlashMessagesList from './shared/FlashMessagesList';

// Only when the specific path is used, it will render the specific page
// the exact prop in the HomePage is used to only activate it for / and not /a
// by not setting the prop exact, fuzzy matches can occur 
// like /account/profile/some/thing would work for the second route
function Base() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header username="anonymous" />
        {/* <p>{props.PROGRESS}</p> */}
        <FlashMessagesList />
        <section className="page-content">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/api/auth/login" component={LoginPage} />
          <Route exact path="/api/auth/register" component={RegisterPage} />
          <Route path="/api/profile/:id" component={Authenticate(ProfilePage)} />
          <Route path="/task/editor/:id" component={Authenticate(TaskEditorPage)} />
        </section>
      </div>
    </BrowserRouter>
  );
}

// DON'T USE connect
export default Base;
