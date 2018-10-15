import Immutable from 'immutable';

const PermissionEnum = Immutable.Map({
  'USER': {ordinal: 0, string: 'User'},
  'VOTER': {ordinal: 1, string: 'Voter'},
  'ADMIN': {ordinal: 2, string: 'Admin'},
});

export default PermissionEnum;
