import React from 'react';
import {connect} from 'react-redux';
import {toggleLoggingIn, createUser, validateUser} from './actions';
import './index.css';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component {
  toggleLoggingIn() {
    this.props.dispatch(toggleLoggingIn(!this.props.loggingIn));
  }
  verifyLogIn(e) {
    e.preventDefault();
    const user = {
      email: e.target.email.value, 
      password: e.target.password.value
    }
    if (this.props.loggingIn) {
      this.props.dispatch(validateUser(user))
    } 
    else {
      this.props.dispatch(createUser(user))
      }
  }
  render () {
    const user = {
      email: localStorage.getItem('email'), 
      password: localStorage.getItem('password')
    }
    if (this.props.email && this.props.userid && !this.props.error) {
      return (<Redirect to="/bookmarks" />)
    } else if ((!this.props.email || !this.props.userid || this.props.error) && (user.email && user.password)) { 
      this.props.dispatch((validateUser(user)))
    }
    const errorMessage = (this.props.error) ? `Error: ${this.props.error}` : null;
    const header = (this.props.loggingIn) ? 'Log in' : 'Sign up';
    const toggleSignUp = (this.props.loggingIn) ? 'Signing up? Click here.' : 'Logging in? Click here.'
    return (
      <form onSubmit={e => this.verifyLogIn(e)}>
        <fieldset name="sign-up">
          <legend>{header}</legend>
          <div className="mainlogin">
            <label htmlFor="email">Email<br /></label>
            <input type="email" placeholder="foo@bar.com" name="email" id="email" required />
            <br /><br />
            <label htmlFor="password">Password<br /></label>
            <input type="password" placeholder="1234passw0rd" name="password" id="password" required />
            <br />
            <button type="submit">Submit<br /></button>
            <p>{errorMessage}</p>
          </div>
        </fieldset>
        <a href="#" onClick={() => this.toggleLoggingIn()}>{toggleSignUp}</a>
      </form>
    )
  }
}

const mapStateToProps = (state)  => ({
  loggingIn: state.login.loggingIn,
  error: state.login.error, 
  email: state.login.email,
  userid: state.login.userid,
})

export default connect(mapStateToProps)(Login);
