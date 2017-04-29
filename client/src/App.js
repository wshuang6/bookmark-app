import React from 'react';
import Bookmarks from './bookmarks';
import Folders from './folders';
import Login from './login';
import Header from './header';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {validateUser} from './login/actions';

export class Components extends React.Component {
  render () {
      return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" render={() => {
            const user = {
              email: localStorage.getItem('email'), 
              password: localStorage.getItem('password')
            }
            if (user.email && user.password) {
              this.props.dispatch(validateUser(user))
              return (<Redirect to="/bookmarks"/>)
            }
            else {
              return (<Redirect to="/login"/>)
            }
          }} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bookmarks" component={Folders} />
          <Route exact path="/bookmarks" component={Bookmarks} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  error: state.login.error,
  userid: state.login.userid,
})

export default connect(mapStateToProps)(Components);