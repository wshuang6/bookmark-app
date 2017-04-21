import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import logo from '../logo.png';

export class Nav extends React.Component {
  render () {
    return (
      <nav>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
        <h3>{this.props.login}</h3>
      </nav>
    )
  }
}

const mapStateToProps = (state)  => ({
  login: state.login.email,
  bookmarks: state.bookmarks.bookmarks
})

export default connect(mapStateToProps)(Nav);
