import React, { Component } from 'react';
import { connect } from 'react-redux';
import CityList from './CityList';
import withAuthorization from '../hoc/withAuthorization';
import { compose } from 'recompose';

class HomePage extends Component {
  render () {
    return <CityList cities={this.props.cities}/>;
  }
}

const mapStateToProps = (state) => ({
  cities: state.firebase.cities,
});

const authenticationCondition = (authenticatedUser) => !!authenticatedUser;

export default compose(
  withAuthorization(authenticationCondition),
  connect(mapStateToProps),
)(HomePage);
