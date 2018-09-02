import React from 'react';

const AirportOption = ({airport}) => (
  <option value={airport.id}>{airport.name}</option>
);

export default AirportOption;
