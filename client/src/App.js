import React from 'react';
import Bookmarks from './bookmarks';
import Folders from './folders';
import Users from './users';
import Login from './login';

export default class Components extends React.Component {
  render () {
    return (
      <div>
        <Login />
        {/*<Users />
        <Bookmarks />
        <Folders />*/}
      </div>
    )
  }
}