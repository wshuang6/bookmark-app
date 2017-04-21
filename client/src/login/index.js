import React from 'react';
import {connect} from 'react-redux';
import {toggleLoggingIn, createUser, validateUser} from './actions';
import './index.css';
import {Redirect} from 'react-router-dom';

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
    const user = {
      email: e.target.email.value, 
      password: e.target.password.value
    }
    this.props.dispatch(validateUser(user));
  }
  //TO-DO REFACTOR THIS PART. UNNECESSARY TO HAVE BOTH CHECKS.
  createUser(e) {
    e.preventDefault();
    const user = {
      email: e.target.email.value, 
      password: e.target.password.value
    }
    this.props.dispatch(createUser(user));
  }
  render () {
    if (this.props.email && this.props.userid && !this.props.error) {
      return (<Redirect to="/bookmarks" />)
    }
    let errorMessage;
    if (this.props.error) {
      errorMessage = `Error: ${this.props.error}`
    }
    const formFiller = (
      <div className="mainlogin">
        <label htmlFor="email">Email<br /></label>
        <input type="email" placeholder="foo@bar.com" name="email" id="email" required />
        <br /><br />
        <label htmlFor="password">Password<br /></label>
        <input type="password" placeholder="1234passw0rd" name="password" id="password" required />
        <br />
        <button type="submit">Submit<br /></button>
        <p>{errorMessage}</p>
      </div>)

      //TO-DO REFACTOR TO NO LONGER BE AN IFFE. ALSO REFACTOR BECAUSE ALL YOU NEED ARE THE WORDS
    const renderLogIn = (() => {
      if (this.props.loggingIn) {
        return (
          <form onSubmit={e => this.verifyLogIn(e)}>
            <fieldset name="sign-up">
              <legend>Log in</legend>
              {formFiller}
            </fieldset>
            <a href="#" onClick={(e) => this.signingUp(e)}>Signing up? Click here.</a>
          </form>)
      } else
      if (!this.props.loggingIn) {
        return (
          <form onSubmit={e => this.createUser(e)}>
            <fieldset name="sign-up">
              <legend>Sign up</legend>
              {formFiller}
            </fieldset>
            <a href="#" onClick={(e) => this.loggingIn(e)}>Logging in? Click here.</a>
          </form>)
      }
    })();
    return (<div>{renderLogIn}</div>)
  }
}

const mapStateToProps = (state)  => ({
  loggingIn: state.login.loggingIn,
  error: state.login.error, 
  email: state.login.email,
  userid: state.login.userid,
})

export default connect(mapStateToProps)(Login);
