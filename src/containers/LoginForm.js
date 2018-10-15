import React, { Component } from 'react';
import { Alert, Col, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import * as email_validator from 'email-validator/index';
import { firebaseLogin } from '../actions/firebase';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HOME } from '../constants/routes';
import Util from '../util'

const getValidationState = (email) => {
  if(email === '') return null;
  return email_validator.validate(email);
};

const INITIAL_STATE = {
  email   : '',
  password: '',
  error   : null,
};

class LoginForm extends Component {
  constructor (props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const { email, password, } = this.state;
    const { history } = this.props;

    /*Bad hack -- I shouldn't do this, but I am too lazy to actually come up with
      a good solution. I don't want both fields to appear red when loading page.
      So if a user tries to submit the form with no password, I am just going to
      ninja edit the value to something random and throw up an error on the
      client.
     */

    try {
      if (password === '')
        await firebaseLogin(email, 'thisisprobablynotyouractualpassword');
      await firebaseLogin(email, password);
      history.push(HOME);
    }
    catch(error) {
      this.setState(Util.byPropKey('error', error));
    }
  };

  render () {
    const {
            email,
            password,
            error,
          } = this.state;

    return (
      <Col lg={{size: 8, offset: 2}}>
        <div className={'jumbotron'}>
          <h2 align='center'> Welcome to The Retreat!</h2>
          <Form>
            <FormGroup>
              <Col sm={{size: 6, offset: 3}}>
                <Label for={'userEmail'}>Email</Label>
                <Input
                  className={'form-control'}
                  type={'email'}
                  name={'email'}
                  id={'userEmail'}
                  value={email}
                  placeholder={'Email Address'}
                  onChange={event => this.setState(
                    Util.byPropKey('email', event.target.value))}
                  valid={getValidationState(email)}
                  invalid={!getValidationState(email)}
                />
                <FormFeedback/>
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={{size: 6, offset: 3}}>
                <Label for={'userPassword'}>Password</Label>
                <Input
                  className={'form-control'}
                  type={'password'}
                  placeholder={'Password'}
                  name={'password'}
                  id={'userPassword'}
                  value={password}
                  onChange={event => this.setState(
                    Util.byPropKey('password', event.target.value))}
                />
              </Col>
            </FormGroup>
            {error && (<FormGroup>
              <Col sm={12}>
                <Alert color={'danger'}>
                  {error.message}
                </Alert>
              </Col>
            </FormGroup>)}
            <FormGroup>
              <Col sm={{size: 9, offset: 7}}>
                <button
                  className={'btn btn-success'}
                  onClick={this.onSubmit}
                >
                  Sign In
                </button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Col>
    );
  }
}

export default withRouter(connect()(LoginForm));
