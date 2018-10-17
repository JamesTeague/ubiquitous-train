import React from 'react';
import { NavLink } from 'reactstrap';
import { firebaseLogout } from '../actions/firebase';

const SignOutLink = () =>(
  <NavLink onClick={firebaseLogout}>Sign Out</NavLink>
);

export default SignOutLink;
