import React from 'react';
import {connect} from 'react-redux';
import {toggleLoggingIn} from './actions';

export class Login extends React.Component {
  loggingIn(e) {
    e.preventDefault();
    this.props.dispatch(toggleLoggingIn(true));
  }
  signingUp(e) {
    e.preventDefault();
    this.props.dispatch(toggleLoggingIn(false));
  }
  verifyLogIn(e) {
    e.preventDefault();
    console.log('attempted to log in');
  }
  createUser(e) {
    localStorage.setItem('email', e.target.email.value);
    localStorage.setItem('password', e.target.password.value);
    // localStorage.getItem('password');
    console.log(localStorage.getItem('boobs'));
    e.preventDefault();
    console.log('attempted to create user');
  }
  render () {
    const formFiller = (
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="foo@bar.com" name="email" id="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="1234passw0rd" name="password" id="password" required />
        <button type="submit">Log in</button>
      </div>)
    const renderLogIn = (() => {
      if (this.props.loggingIn) {
        return (
          <form onSubmit={e => this.verifyLogIn(e)}>
            <fieldset name="sign-up">
              <legend>Log in</legend>
              {formFiller}
            </fieldset>
            <button onClick={(e) => this.signingUp(e)}>Signing up? Click here.</button>
          </form>)
      } else
      if (!this.props.loggingIn) {
        return (
          <form onSubmit={e => this.createUser(e)}>
            <fieldset name="sign-up">
              <legend>Sign up</legend>
              {formFiller}
            </fieldset>
            <button onClick={(e) => this.loggingIn(e)}>Logging in? Click here.</button>
          </form>)
      }
    })();
    return (<div>{renderLogIn}</div>)
  }
}

const mapStateToProps = (state)  => ({
  loggingIn: state.login.loggingIn
})

export default connect(mapStateToProps)(Login);
