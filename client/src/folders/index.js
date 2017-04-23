import React from 'react';
import {connect} from 'react-redux';
import {fetchFolders, toggleAddFolder, editFolder, deleteFolders, currentFolder, searchBookmarks} from './actions';
import FolderModal from './folder-modal';
import './index.css';
import {removeUser} from '../login/actions';
import {Link, Redirect} from 'react-router-dom';

export class Folders extends React.Component {
  searchFilter (currentSearchTerm) {
    let searchedArray = [];
    let i = 0;
    let i2 = 0;
    const bookmarks = this.props.bookmarks;
    const filterFunction = (bookmark) => {
      while ((i < 5) && (i2 < bookmarks.length)) {
        if (bookmark[i2].title.toLowerCase().includes(currentSearchTerm.toLowerCase()) && (bookmark[i2].folderid === this.props.currentFolderId)) {
          searchedArray.push(bookmark[i2])
          i++
        }
        i2++
      }
    }
    filterFunction(bookmarks);
    if (currentSearchTerm.length === 0) {
      this.props.dispatch(searchBookmarks([]));
    } 
    else {
      this.props.dispatch(searchBookmarks(searchedArray));
    }
  }  
  logOut () {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.props.dispatch(removeUser());
  }
  renderResults() {
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    let folderList = this.props.folders.map((folder) => {
      return (<li key={folder.folderid}>
      <a href='#' onClick={() => this.props.dispatch(currentFolder(folder.folderid))}>{folder.foldername}</a>
      <button onClick={() => {this.editFolder(folder)}}>Edit</button>
      <button onClick={() => {this.deleteFolder(folder.folderid)}}>Delete</button></li>)
    });
    return (folderList)
  }
  renderSearchResults() {
    let list = this.props.results.map((bookmark, i) => {
      const imageURL = (() => {
        if (bookmark.image) {return bookmark.image}
        return `https://www.google.com/s2/favicons?domain=${bookmark.url}`
      })();
      let bookmarkURL;
      if (!bookmark.url.toLowerCase().includes('http://')) {bookmarkURL = `http://${bookmark.url}`}
      else {bookmarkURL = bookmark.url}
      return (<div><img alt="" src={imageURL}/><a key={i} href={bookmarkURL}>{bookmark.title}</a></div>)});
    return (list)
  }
  deleteFolder(folderid) {
    this.props.dispatch(deleteFolders(this.props.userid, folderid))
  }
  toggleAddFolder(event) {
    event.preventDefault();
    this.props.dispatch(toggleAddFolder());
  }
  editFolder(folder) {
    event.preventDefault();
    this.props.dispatch(editFolder(folder));
  }
  componentDidMount() {
    this.props.dispatch(fetchFolders(this.props.userid));
  }
  render () {
    if (!this.props.userid && !this.props.error) { //WH: redirects to /login because going to / seemed to cause infintie loop
      return (<Redirect to="/login" />)
    }
    let folderModal;
    if (this.props.toggleAdd || this.props.editing) {
        folderModal = <FolderModal />;
    }
    return (
      <div className="sidebar sidebar-left">
        <nav className="folder-menu">
          <p>Logged in as {this.props.email}</p>
          <button onClick={() => {this.logOut()}}><Link to="/login">Log out</Link></button><br />
          <div className='dropdown'>
            <form onChange={e => {
              console.log(e.target.value)
              this.searchFilter(e.target.value)}}>
            <input type="text" name="search" id="search" autoComplete="off" placeholder="Search" />
            </form>
            <div className="dropdown-content">
              {this.renderSearchResults()}
            </div>
          </div>
          <ul className="folder-menu-list">
            {folderModal}
            <a href="#" onClick={e => this.toggleAddFolder(e)}>
                Add Folder
            </a>
            <li><a href='#' onClick={() => this.props.dispatch(currentFolder(null))}>Unorganized PageMarks</a></li>
            {this.renderResults()}
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state)  => ({
  folders: state.folders.folders,
  loading: state.folders.loading, 
  error: state.folders.error,
  userid: state.login.userid,
  toggleAdd: state.folders.toggleAdd,
  editing: state.folders.editing,
  currentFolderId: state.folders.currentFolderId,
  email: state.login.email,
  bookmarks: state.bookmarks.bookmarks,
  results: state.folders.results,
})

export default connect(mapStateToProps)(Folders);
