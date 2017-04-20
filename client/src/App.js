import React from 'react';
import Bookmarks from './bookmarks';
import Folders from './folders';
import Users from './users';
import Login from './login';

export default class Components extends React.Component {
  render () {
    let render
    return (
      <div>
        {/*<Login />*/}
        <Users />
        <Bookmarks />
        <Folders />
      </div>
    )
  }
}

// router, /login goes to login, / goes to main page
// in login, have certain conditions in state. if logged in, redirect to slash
