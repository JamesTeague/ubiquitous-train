import React from 'react';
import { connect } from 'react-redux';
import * as routes from '../constants/routes';
import SignOutLink from './SignOutLink';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (
      <NavigationContainer
        authUser={this.props.authenticatedUser}
        toggle={this.toggle}
        isOpen={this.state.isOpen}
      />
    );
  }
}

const NavigationContainer = ({ authUser, toggle, isOpen }) =>
  <Navbar color={'dark'} dark expand={'md'}>
    <NavbarBrand href={routes.HOME}>Retreat</NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      {authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
    </Collapse>
  </Navbar>;

const NavigationAuth = () =>
  <Nav className={'ml-auto'} navbar>
    <NavItem><NavLink to={routes.ACCOUNT}>Account</NavLink></NavItem>
    <NavItem><SignOutLink/></NavItem>
  </Nav>;

const NavigationNonAuth = () =>
  <Nav className={'ml-auto'} navbar>
    <NavItem><NavLink to={routes.LOGIN}>Sign In</NavLink></NavItem>
  </Nav>;

const mapStateToProps = (state) => ({
  authenticatedUser: state.session.authUser,
});

export default connect(mapStateToProps)(Navigation);
