import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { authRef } from '../config/firebase';
import * as routes from '../constants/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      authRef.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.LOGIN);
        }
      });
    }

    render() {
      return this.props.authUser ? <Component /> : null;
    }
  }

  const mapStateToProps = (state) => ({
    authUser: state.session.authUser,
  });

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization);
};

export default withAuthorization;
