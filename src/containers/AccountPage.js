import React, { Component } from 'react'
import { compose } from 'recompose';
import withAuthorization from '../hoc/withAuthorization';
import { connect } from 'react-redux';
import { Col, FormGroup, Input, Label, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
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
      newUserPassword
    } = this.state;

    const newRecord = await adminAuthRef.createUserWithEmailAndPassword(newUserEmail, newUserPassword);
    adminAuthRef.signOut();
    console.log('Created new user', newRecord.user);

    // TODO - Alert Admin that user has been created.

    usersRef.child(newRecord.user.uid).set({
      displayName: newUserDisplayName,
      email: newUserEmail,
      permission: newUserPermission,
      emailVerified: false,
      uid: newRecord.user.uid,
    });
  };

  render () {
    return (
      <div>
        <Nav tabs className={'mb-2'}>
          <NavItem>
            <NavLink
              className={ this.state.activeTab.toUpperCase() === 'GENERAL' ? 'active' : '' }
              onClick={() => { this.toggle('GENERAL'); }}
            >
              General
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={this.state.activeTab.toUpperCase() === 'FLIGHT' ? 'active' : ''}
              onClick={() => { this.toggle('FLIGHT'); }}
            >
              Flight
            </NavLink>
          </NavItem>
          {this.props.user.permission === permissions.ADMIN.ordinal &&
            <NavItem>
              <NavLink
                className={this.state.activeTab.toUpperCase() === 'ADMIN' ? 'active' : ''}
                onClick={() => {
                  this.toggle('ADMIN');
                }}
              >
                Admin
              </NavLink>
            </NavItem>
          }
        </Nav>
        <TabContent activeTab={this.state.activeTab.toUpperCase()}>
          <TabPane tabId={'GENERAL'}>
            <Col sm={{size: 6, offset: 3}}>
              <Label for={'userDisplayName'}>Display Name</Label>
              <Input
                type={'text'}
                value={this.state.displayName}
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
                        value={this.state.newUserDisplayName}
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
                        value={this.state.newUserEmail}
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
                        value={this.state.newUserPassword}
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
                          <option value={permissions.USER.ordinal}>{permissions.USER.string}</option>
                          <option value={permissions.VOTER.ordinal}>{permissions.VOTER.string}</option>
                          <option value={permissions.ADMIN.ordinal}>{permissions.ADMIN.string}</option>
                      </Input>
                    </Col>
                  </FormGroup>
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
