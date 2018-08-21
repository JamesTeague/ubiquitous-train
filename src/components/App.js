import React from 'react';
import LoginForm from '../containers/LoginForm';
import { BrowserRouter, Route } from 'react-router-dom';
import HomePage from '../containers/HomePage';
import Navigation from './Navigation';
import * as routes from '../constants/routes';
import withAuthentication from '../hoc/withAuthentication';
import { connect } from 'react-redux';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <div className='container'>
          <Route exact path={routes.HOME} component={() => <HomePage />}/>
          <Route exact path={routes.LOGIN} component={() => <LoginForm />}/>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.user
});

export default withAuthentication(connect(mapStateToProps)(App));
