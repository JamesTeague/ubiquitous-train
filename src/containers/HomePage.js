import React, { Component } from 'react';
import { firebaseConnect, isLoaded, } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import CityList from '../components/CityList';
import withAuthorization from '../hoc/withAuthorization';
import firebasePaths from "../constants/referencePaths";

class HomePage extends Component {

  render () {
    const { cities } = this.props;
    if(isLoaded(cities)) {
      return <CityList cities={
        Object.entries(cities).map((entry) => {
          entry[1].id = entry[0];
          return entry[1];
        })
      }/>;
    }
    return <div/>
  }
}

const firebaseConnection = firebaseConnect(() => [
  { path: firebasePaths.CITIES },
]);

const mapStateToProps = (state) => ({
  cities: state.firebase.data.cities,
});

const authenticationCondition = (authenticatedUser) => !!authenticatedUser;

export default compose(
  withAuthorization(authenticationCondition),
  firebaseConnection,
  connect(mapStateToProps),
)(HomePage);
