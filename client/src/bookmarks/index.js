import React from 'react';
import {connect} from 'react-redux';
import {fetchBookmarks, toggleAddBookmark, editBookmark, deleteBookmarks} from './actions';
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
    if(this.props.loading) {
      return <li>Loading...</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    let bookmarkList = this.props.bookmarks.filter((bookmark) => bookmark.folderid === this.props.currentFolderId);
    bookmarkList = bookmarkList.map((bookmark) => {
      const imageURL = (bookmark.image) ? bookmark.image : `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
      const bookmarkURL = (!bookmark.url.toLowerCase().includes('http://')) ? `http://${bookmark.url}` : bookmark.url;
      return (
        <li className="bookmarkli" key={bookmark.bookmarkid}><img src={imageURL} alt="" />
          <a href={bookmarkURL} target="_blank">{bookmark.title}</a> - {bookmark.notes}
          <button className="button" onClick={() => this.editBookmark(bookmark)}>
            <img src="http://freevector.co/wp-content/uploads/2014/02/61776-edit-button.png" alt="Edit" className="buttonImg" />
          </button>
          <button className="button" onClick={() => this.deleteBookmark(bookmark.bookmarkid)}>
            <img src="https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png" alt="Delete" className="buttonImg" />
          </button>
        </li>
      )
    });
    return (bookmarkList);
  }
  render () {
    let bookmarkModal;
    if (this.props.toggleAdd || this.props.editing) {
        bookmarkModal = <BookmarkModal />;
    }
    return (
      <div className="bookmarkdiv">
        <ul className="bookmarkul">
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
  toggleAdd: state.bookmarks.toggleAdd,
  editing: state.bookmarks.editing,
  userid: state.login.userid,
  currentFolderId: state.folders.currentFolderId
})

export default connect(mapStateToProps)(Bookmarks);
