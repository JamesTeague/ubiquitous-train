import React from 'react';
import CityListItem from '../components/CityListItem';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

const CityList = ({ cities }) => {
  if (cities && cities.length > 0) {
    return (
      <Table responsive striped>
        <thead>
        <tr>
          <th>Name</th>
          <th>State</th>
          <th>Country</th>
        </tr>
        </thead>
        <tbody>
        {cities.map((city) => (
          <CityListItem key={city.id} {...city} />
        ))}
        </tbody>
      </Table>
    );
  }
  else {
    return (
      <div>No data retrieved.</div>
    );
  }
};

export default connect()(CityList);
