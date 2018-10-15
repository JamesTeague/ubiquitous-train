import React from 'react';
import { Table } from 'reactstrap';
import CityListItem from './CityListItem';

const CityList = ({ cities }) => {
  if (cities.length > 0) {
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

export default CityList;
