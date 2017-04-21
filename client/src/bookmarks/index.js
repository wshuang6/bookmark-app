import React from 'react';
import {connect} from 'react-redux';
import {fetchBookmarks, toggleAddBookmark, editBookmark, deleteBookmarks} from './actions';
import BookmarkModal from './bookmark-modal';

export class Bookmarks extends React.Component {
  renderResults() {
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    let bookmarkList = this.props.bookmarks.filter((bookmark) => {return bookmark.folderid == this.props.currentFolderId})
    bookmarkList = bookmarkList.map((bookmark) => {
      const imageURL = (() => {
        if (bookmark.image) {return bookmark.image}
        return `https://www.google.com/s2/favicons?domain=${bookmark.url}`
      })();
      let bookmarkURL;
      if (!bookmark.url.toLowerCase().includes('http://')) {bookmarkURL = `http://${bookmark.url}`}
      else {bookmarkURL = bookmark.url}
      return (<li key={bookmark.bookmarkid}><img src={imageURL} alt="" />
      <a href={bookmarkURL}>{bookmark.title}</a> - {bookmark.notes}
      <button onClick={() => {this.editBookmark(bookmark)}}>Edit</button>
      <button onClick={() => {this.deleteBookmark(bookmark.bookmarkid)}}>Delete</button></li>)
    });
    return (bookmarkList)
  }
  deleteBookmark(bookmarkid) {
    this.props.dispatch(deleteBookmarks(this.props.userid, bookmarkid))
  }
  toggleAddBookmark(event) {
    event.preventDefault();
    this.props.dispatch(toggleAddBookmark());
  }
  editBookmark(bookmark) {
    event.preventDefault();
    this.props.dispatch(editBookmark(bookmark));
  }
  componentDidMount() {
    this.props.dispatch(fetchBookmarks(this.props.userid));
  }
  render () {
    let bookmarkModal;
    if (this.props.toggleAdd || this.props.editing) {
        bookmarkModal = <BookmarkModal />;
    }
    return (
      <div>
        <ul>
          {bookmarkModal}
          <a href="#" onClick={e => this.toggleAddBookmark(e)}>
              Add bookmark
          </a>
          {this.renderResults()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state)  => ({
  bookmarks: state.bookmarks.bookmarks,
  loading: state.bookmarks.loading, 
  error: state.bookmarks.error,
  userid: state.users.userid,
  toggleAdd: state.bookmarks.toggleAdd,
  editing: state.bookmarks.editing,
  currentFolderId: state.folders.currentFolderId
})

export default connect(mapStateToProps)(Bookmarks);
