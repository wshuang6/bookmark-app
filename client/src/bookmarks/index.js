import React from 'react';
import { connect } from 'react-redux';
import { fetchBookmarks, toggleAddBookmark, editBookmark, deleteBookmarks } from './actions';
import BookmarkModal from './bookmark-modal';
import './index.css';

export class Bookmarks extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBookmarks(this.props.userid));
  }
  deleteBookmark(bookmarkid) {
    this.props.dispatch(deleteBookmarks(this.props.userid, bookmarkid))
  }
  toggleAddBookmark(event) {
    this.props.dispatch(toggleAddBookmark());
  }
  editBookmark(bookmark) {
    event.preventDefault();
    this.props.dispatch(editBookmark(bookmark));
  }
  renderResults() {
    if (this.props.loading) {
      return <li>Loading...</li>;
    }
    if (this.props.error) {
      return <li>Error</li>;
    }
    let bookmarkList = this.props.bookmarks.filter((bookmark) => bookmark.folderid === this.props.currentFolderId);
    bookmarkList = bookmarkList.map((bookmark) => {
      const imageURL = (bookmark.image) ? bookmark.image : `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
      const bookmarkURL = (!bookmark.url.toLowerCase().includes('http://')) ? `http://${bookmark.url}` : bookmark.url;
      return (
        <li className="bookmarkli" key={bookmark.bookmarkid}>
          <a href={bookmarkURL} target="_blank">
            <img className="favicon" src={imageURL} alt="" />
            <p className="bookmark-title">{bookmark.title}</p>
          </a>
          <a href={bookmarkURL} target="_blank">
            <p className="bookmark-url">{bookmarkURL}</p>
          </a>
          <p className="bookmark-notes">{bookmark.notes}</p>
          <div className="align-right">
          <a onClick={() => this.editBookmark(bookmark)}>
            <i className="fa fa-edit icon"></i>
          </a>
          <a onClick={() => this.deleteBookmark(bookmark.bookmarkid)}>
            <i className="fa fa-close icon"></i>
          </a>
          </div>
        </li>
      )
    });
    return (bookmarkList);
  }
  render() {
    let bookmarkModal;
    if (this.props.toggleAdd || this.props.editing) {
      bookmarkModal = <BookmarkModal />;
    }
    return (
      <div className="bookmarkdiv">
        {bookmarkModal}
        <div className="bookies">
          <button id="bookbutton" onClick={e => this.toggleAddBookmark(e)}>
            <a href="#">Add bookmark</a>
          </button>
        </div>
        <h3>My bookmarks</h3>
        <ul className="bookmarkul">
          {this.renderResults()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  bookmarks: state.bookmarks.bookmarks,
  loading: state.bookmarks.loading,
  error: state.bookmarks.error,
  toggleAdd: state.bookmarks.toggleAdd,
  editing: state.bookmarks.editing,
  userid: state.login.userid,
  currentFolderId: state.folders.currentFolderId
})

export default connect(mapStateToProps)(Bookmarks);
