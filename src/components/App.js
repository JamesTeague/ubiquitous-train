import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import * as routes from '../constants/routes';
import withAuthentication from '../hoc/withAuthentication';
import LoginForm from '../containers/LoginForm';
import HomePage from '../containers/HomePage';
import Navigation from './Navigation';
import Footer from '../components/Footer';
import AccountPage from '../containers/AccountPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navigation />
        <div>
          <Switch>
            <Redirect exact path={routes.INDEX} to={routes.HOME}/>
            <Route exact path={routes.HOME} component={() => <HomePage />}/>
          </Switch>
          <Route exact path={routes.LOGIN} component={() => <LoginForm />}/>
          <Route exact path={routes.ACCOUNT} component={() => <AccountPage />}/>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => ({
  authenticatedUser: state.user
});

export default withAuthentication(connect(mapStateToProps)(App));
