import React from 'react';
import {connect} from 'react-redux';

export class Bookmarks extends React.Component {
  render () {
    const email = this.props.email;
    return (
          <p>user: {email}</p>
    )
  }
}

const mapStateToProps = (state)  => ({
  email: state.users.email
})

export default connect(mapStateToProps)(Bookmarks);
