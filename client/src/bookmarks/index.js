import React from 'react';
import {connect} from 'react-redux';
import {fetchBookmarks} from './actions';

export class Bookmarks extends React.Component {
  renderResults() {
    console.log(this.props.bookmarks);
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    const bookmarkList = this.props.bookmarks.map((bookmark, i) => {
      return (<li key={bookmark.bookmarkid}>{bookmark.url}{bookmark.title}{bookmark.notes}{bookmark.folderid}{bookmark.image}{bookmark.userid}</li>)
    });
    return (bookmarkList)
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks());
  }
  render () {
    return (
      <div>
        <ul>
          {this.renderResults()}
        </ul>
        <button>ADD A BOOKMARK</button>
      </div>
    )
  }
}

const mapStateToProps = (state)  => ({
  bookmarks: state.bookmarks.bookmarks,
  loading: state.bookmarks.loading, 
  error: state.bookmarks.error,
})

export default connect(mapStateToProps)(Bookmarks);
