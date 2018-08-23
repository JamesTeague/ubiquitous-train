import React from 'react';
import { connect } from 'react-redux';
import * as routes from '../constants/routes';
import SignOutLink from './SignOutLink';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.redirectTo = this.redirectTo.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  redirectTo (route) {
    this.props.history.push(route);
  }

  render () {
    return (
      <NavigationContainer
        authUser={this.props.authenticatedUser}
        toggle={this.toggle}
        isOpen={this.state.isOpen}
        redirectTo={this.redirectTo}
      />
    );
  }
}

const NavigationContainer = ({ authUser, toggle, isOpen, redirectTo }) =>
  <Navbar color={'dark'} dark expand={'md'} sticky={'top'}>
    <NavbarBrand onClick={() => redirectTo(routes.HOME)}>Retreat</NavbarBrand>
    <NavbarToggler onClick={toggle} />
    <Collapse isOpen={isOpen} navbar>
      {authUser ? <NavigationAuth redirectTo={redirectTo}/> : <NavigationNonAuth redirectTo={redirectTo}/>}
    </Collapse>
  </Navbar>;

const NavigationAuth = ({ redirectTo }) =>
  <Nav className={'ml-auto'} navbar>
    <NavItem><NavLink onClick={() => redirectTo(routes.ACCOUNT)}>Account</NavLink></NavItem>
    <NavItem><SignOutLink/></NavItem>
  </Nav>;

const NavigationNonAuth = ({ redirectTo }) =>
  <Nav className={'ml-auto'} navbar>
    <NavItem><NavLink onClick={() => redirectTo(routes.LOGIN)}>Sign In</NavLink></NavItem>
  </Nav>;

const mapStateToProps = (state) => ({
  authenticatedUser: state.session.authUser,
});

export default withRouter(connect(mapStateToProps)(Navigation));
