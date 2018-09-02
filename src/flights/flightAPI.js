import * as skypicker from 'skypicker';
import geocoder from 'geocoder-geojson';

const getCoordinatesByCity = async (address) => {
  const coordinatesResponse = await geocoder.google(address);
  const coordinates = coordinatesResponse.features[0].geometry.coordinates;
  return {
    longitude: coordinates[0],
    latitude: coordinates[1]
  }
};

const searchAirportsByRadius = async (coordinateObject, radius = 100) => skypicker.searchLocationsByRadius({
  coordinate: coordinateObject,
  radius: radius,
  locale: 'en-EN',
  locationTypes: [skypicker.LOCATION_TYPES.AIRPORT],
  limit: 10,
  sort: skypicker.LOCATION_RESULTS_SORT_TYPES.ASCENDING_NAME,
});

export {
  getCoordinatesByCity,
  searchAirportsByRadius
}

