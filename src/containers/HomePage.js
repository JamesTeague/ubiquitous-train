import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onceGetCities } from '../firebase/database';
import CityList from './CityList';
import withAuthorization from '../hoc/withAuthorization';
import { compose } from 'recompose';
import { CITIES_SET } from '../actions/types';

class HomePage extends Component {
  componentDidMount () {
    const { onSetCities } = this.props;

    onceGetCities().then(snapshot =>
      onSetCities(snapshot.val()),
    );
  }

  render () {
    return <CityList cities={this.props.cities}/>;
  }
}

const mapStateToProps = (state) => ({
  cities: state.firebase.cities,
});

const mapDispatchToProps = (dispatch) => ({
  onSetCities: (cities) => dispatch(CITIES_SET(cities)),
});

const authenticationCondition = (authenticatedUser) => !!authenticatedUser;

export default compose(
  withAuthorization(authenticationCondition),
  connect(mapStateToProps,mapDispatchToProps),
)(HomePage);
