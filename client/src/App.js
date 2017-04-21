import React from 'react';
import Bookmarks from './bookmarks';
import Folders from './folders';
import Users from './users';
import Login from './login';
import Nav from './nav';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {validateUser} from './login/actions'

export class Components extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Nav />
          <Route exact path="/" render={() => {
            if (this.props.email && this.props.userid && !this.props.error && localStorage.getItem('email') && localStorage.getItem('password')) {
              return (<Redirect to="/bookmarks"/>)
            }
            else {
              return (<Redirect to="/login"/>)}
          }} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/bookmarks" component={Users} />
          <Route exact path="/bookmarks" component={Bookmarks} />
          <Route exact path="/bookmarks" component={Folders} />
          {/*<Login />
          <Users />
          <Bookmarks />
          <Folders />*/}
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