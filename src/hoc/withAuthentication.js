import React from 'react';
import { authRef } from '../config/firebase';
import { AUTH_USER_SET, CITIES_SET, CITIES_UNSET } from '../actions/types';
import { connect } from 'react-redux';
import { doesUserExist, onCityValue } from '../firebase/database';

const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {
    constructor (props) {
      super(props);
    }

    async componentDidMount () {
      const {
        onSetAuthUser,
        onCityValue,
        unsetCities,
      } = this.props;

      authRef.onAuthStateChanged(authUser => {
        if(authUser) {
          doesUserExist(authUser.uid).then((user) => {
            if(user) onSetAuthUser(user);
            else onSetAuthUser(authUser);
          });
          onCityValue();
        }
        else {
          unsetCities();
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
    unsetCities: () => dispatch(CITIES_UNSET()),
    onCityValue: () => onCityValue(snapshot => dispatch(CITIES_SET(snapshot.val()))),
  });

  return connect(null, mapDispatchToProps)(WithAuthentication);
};

export default withAuthentication;
