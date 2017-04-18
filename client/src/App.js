import React from 'react';
import Bookmarks from './bookmarks';
import Folders from './folders';

export default class Components extends React.Component {
  render () {
    return (
      <div>
        <Bookmarks />
        <Folders />
      </div>
    )
  }
}