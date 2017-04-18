import React from 'react';
import {connect} from 'react-redux';
import {fetchBookmarks, toggleAddBookmark} from './actions';
import AddBookmark from './add-bookmark';

export class Bookmarks extends React.Component {
  renderResults() {
    console.log(this.props.bookmarks);
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    //change promise so only get bookmarks where bookmark.userid === userid
    //filter array where userid is equal to current folderid
    const bookmarkList = this.props.bookmarks.map((bookmark, i) => {
      return (<li key={bookmark.bookmarkid}>{bookmark.url}{bookmark.title}{bookmark.notes}{bookmark.folderid}{bookmark.image}{bookmark.userid}        <button>-</button></li>)
    });
    return (bookmarkList)
  }
  toggleAddBookmark(event) {
    event.preventDefault()
      this.props.dispatch(toggleAddBookmark());
  }
  componentDidMount() {
    this.props.dispatch(fetchBookmarks());
  }
  render () {
    let bookmarkModal;
    if (this.props.toggleAdd) {
        bookmarkModal = <AddBookmark />;
    }
    return (
      <div>
        <ul>
          {bookmarkModal}
          <a className="what" href="#" onClick={e => this.toggleAddBookmark(e)}>
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
  //identifying which folder user should be in
})

export default connect(mapStateToProps)(Bookmarks);
