import React from 'react';

import { firebaseLogout } from '../actions/firebase';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

const SignOutLink = () =>(
  <NavLink onClick={firebaseLogout}>Sign Out</NavLink>
);

export default connect()(SignOutLink);
