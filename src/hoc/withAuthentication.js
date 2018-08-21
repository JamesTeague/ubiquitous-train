import React from 'react';
import { authRef } from '../config/firebase';
import { AUTH_USER_SET } from '../actions/types';
import { connect } from 'react-redux';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor (props) {
      super(props);

      this.state = { authUser: null, };
    }

    componentDidMount () {
      const { onSetAuthUser } = this.props;
      authRef.onAuthStateChanged(authUser => {
        authUser
          ? onSetAuthUser(authUser)
          : onSetAuthUser(null);
      });
    }

    render () {
      return (
          <Component />
      );
    }
  }

  const mapDispatchToProps = (dispatch) => ({
    onSetAuthUser: (authUser) => dispatch(AUTH_USER_SET(authUser)),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
