import React from 'react';
import {connect} from 'react-redux';

export class Nav extends React.Component {
  render () {
    return (
      <nav>
        <h3>PageMarks</h3>
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
