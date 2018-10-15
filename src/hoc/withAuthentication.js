import React from 'react';
import { authRef } from '../config/firebase';
import { AUTH_USER_SET } from '../actions/types';
import { connect } from 'react-redux';
import { doesUserExist } from '../firebase/database';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    async componentDidMount () {
      const { onSetAuthUser } = this.props;

      authRef.onAuthStateChanged(authUser => {
        if(authUser) {
          doesUserExist(authUser.uid).then((user) => {
            if(user) onSetAuthUser(user);
            else onSetAuthUser(authUser);
          });
        }
        else {
          onSetAuthUser(null);
        }
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
