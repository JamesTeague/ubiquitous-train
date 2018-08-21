import React from 'react';

const CityListItem = ({ id, name, state, country }) => (
  <tr>
    <td>{name}</td>
    <td>{state}</td>
    <td>{country}</td>
  </tr>
);

export default CityListItem;
