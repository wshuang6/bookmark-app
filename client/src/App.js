import React from 'react';
import Bookmarks from './bookmarks';
import Users from './users';

export default class Components extends React.Component {
  render () {
    return (
      <div>
        <Users />
        <Bookmarks />
      </div>
    )
  }
}