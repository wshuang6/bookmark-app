import React from 'react';
import {connect} from 'react-redux';
import {toggleLoggingIn, createUser, validateUser} from './actions';
import './index.css';
import {Redirect} from 'react-router-dom';

export class Login extends React.Component {
  signingUp(boolean) {
    this.props.dispatch(toggleLoggingIn(boolean));
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
    return (
      <form onSubmit={e => this.verifyLogIn(e)}>
          <div className="mainlogin">
        <fieldset className="log-in-field" name="sign-up">
          <legend className="log-in-legend">Sign Up/Log In</legend>
            <label htmlFor="email">Email</label><br />
            <input type="email" placeholder="foo@bar.com" name="email" className="email" required /><br />
            <label htmlFor="password">Password</label><br />
            <input type="password" placeholder="1234passw0rd" name="password" className="password" required /><br />
            <button type="submit" onClick={e => this.signingUp(true)} name="button" className="log-in-button" value="log-in">Log In</button>
            <button type="submit" onClick={e => this.signingUp(false)} name="button" className="log-in-button" value="sign-up">Sign Up</button><br />
            <p>{errorMessage}</p>
        </fieldset>
          </div>
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
