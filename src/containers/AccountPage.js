import React, { Component } from 'react'
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Alert, Col, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import withAuthorization from '../hoc/withAuthorization';
import permissions from "../constants/permissions";
import Util from "../util";
import { adminAuthRef, usersRef } from "../config/firebase";

class AccountPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activeTab: 'GENERAL',
      displayName: props.user.displayName,
      email: props.user.email,
      emailVerified: props.user.emailVerified,
      newUserDisplayName: '',
      newUserEmail: '',
      newUserPermission: 0,
      newUserPassword: '',
      adminResult: null,
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        ...this.state,
        activeTab: tab
      });
    }
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const {
      newUserDisplayName,
      newUserEmail,
      newUserPermission,
      newUserPassword,
    } = this.state;

    adminAuthRef
      .createUserWithEmailAndPassword(newUserEmail, newUserPassword)
      .then((userCredential) => {
        console.log('Created new user %o', userCredential.user);
        adminAuthRef.signOut();
        usersRef
          .child(userCredential.user.uid)
          .set({
            displayName: newUserDisplayName,
            email: newUserEmail,
            permission: newUserPermission,
            emailVerified: false,
            uid: userCredential.user.uid,
          });

        this.setState(Util.byPropKey('adminResult', {type: 'success', message: 'Created new user'}));
        setTimeout(() => this.setState(Util.byPropKey('adminResult', null)), 3000);

      })
      .catch((error) => this.setState(Util.byPropKey('adminResult', {type: 'danger', message: error.message})));

  };

  render () {
    const {
      activeTab,
      adminResult,
      displayName,
      newUserDisplayName,
      newUserEmail,
      newUserPassword,
    } = this.state;
    return (
      <div>
        <Nav tabs className={'mb-2'}>
          <NavItem>
            <NavLink
              className={ activeTab.toUpperCase() === 'GENERAL' ? 'active' : '' }
              onClick={() => { this.toggle('GENERAL'); }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab.toUpperCase() === 'FLIGHT' ? 'active' : ''}
              onClick={() => { this.toggle('FLIGHT'); }}
            >
              Flight
            </NavLink>
          </NavItem>
          {this.props.user.permission === permissions.get('ADMIN').ordinal &&
            <NavItem>
              <NavLink
                className={activeTab.toUpperCase() === 'ADMIN' ? 'active' : ''}
                onClick={() => {
                  this.toggle('ADMIN');
                }}
              >
                Admin
              </NavLink>
            </NavItem>
          }
        </Nav>
        <TabContent activeTab={activeTab.toUpperCase()}>
          <TabPane tabId={'GENERAL'}>
            <Col sm={{size: 6, offset: 3}}>
              <Label for={'userDisplayName'}>Display Name</Label>
              <Input
                type={'text'}
                value={displayName}
                readOnly={true}
              />
            </Col>
          </TabPane>
          <TabPane tabId={'FLIGHT'}>
            {/*<GeneralTab />*/}
          </TabPane>
            <TabPane tabId={'ADMIN'}>
              <Col sm={{size: 6, offset: 3}}>
                <form>
                  <FormGroup>
                    <Col sm={{size: 6, offset: 3}}>
                      <Label for={'newDisplayName'}>Display Name</Label>
                      <Input
                        type={'text'}
                        value={newUserDisplayName}
                        onChange={event => this.setState(
                          Util.byPropKey('newUserDisplayName', event.target.value))}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={{size: 6, offset: 3}}>
                      <Label for={'newEmail'}>Email</Label>
                      <Input
                        type={'text'}
                        value={newUserEmail}
                        onChange={event => this.setState(
                          Util.byPropKey('newUserEmail', event.target.value))}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={{size: 6, offset: 3}}>
                      <Label for={'newPassword'}>Password</Label>
                      <Input
                        className={'form-control'}
                        type={'password'}
                        placeholder={'Password'}
                        name={'password'}
                        id={'newPassword'}
                        value={newUserPassword}
                        onChange={event => this.setState(
                          Util.byPropKey('newUserPassword', event.target.value))}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup>
                    <Col sm={{size: 6, offset: 3}}>
                      <Label for={'newPermission'}>Permission</Label>
                      <Input
                        type={'select'}
                        name={'permissionSelect'}
                        id={'permissionSelect'}
                        onChange={event => this.setState(
                          Util.byPropKey('newUserPermission', event.target.value))}
                      >
                          <option value={permissions.get('USER').ordinal}>{permissions.get('USER').string}</option>
                          <option value={permissions.get('VOTER').ordinal}>{permissions.get('VOTER').string}</option>
                          <option value={permissions.get('ADMIN').ordinal}>{permissions.get('ADMIN').string}</option>
                      </Input>
                    </Col>
                  </FormGroup>
                  {adminResult && (<FormGroup>
                    <Col sm={{size: 6, offset:3}}>
                      <Alert color={adminResult.type}>
                        {adminResult.message}
                      </Alert>
                    </Col>
                  </FormGroup>)}
                  <FormGroup>
                    <Col sm={{size: 9, offset: 7}}>
                      <button
                        className={'btn btn-success'}
                        onClick={this.onSubmit}
                      >
                        Create User
                      </button>
                    </Col>
                  </FormGroup>
                </form>
              </Col>
            </TabPane>
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.session.authUser,
});

const authenticationCondition = (authenticatedUser) => !!authenticatedUser;


export default compose(
  withAuthorization(authenticationCondition),
  connect(mapStateToProps),
)(AccountPage);
