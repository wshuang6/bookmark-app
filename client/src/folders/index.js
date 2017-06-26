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
        if (bookmark[i2].title.toLowerCase().includes(currentSearchTerm.toLowerCase())) {
          searchedArray.push(bookmark[i2])
          i++
        }
        i2++
      }
    }
    filterFunction(bookmarks);
    (currentSearchTerm.length === 0) ? this.props.dispatch(searchBookmarks([])) : this.props.dispatch(searchBookmarks(searchedArray));
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
      return (
      <li key={folder.folderid}>
        <a onClick={() => {this.editFolder(folder)}}>
          <i className="fa fa-edit icon"></i>
        </a>
        <a onClick={() => {this.deleteFolder(folder.folderid)}}>
          <i className="fa fa-close icon"></i>
        </a>
        <a href='#' onClick={() => this.props.dispatch(currentFolder(folder.folderid))}>{folder.foldername}</a>
      </li>)
    });
    return (folderList)
  }
  renderSearchResults() {
    let list = this.props.results.map((bookmark, i) => {
      const imageURL = (bookmark.image) ? bookmark.image : `https://www.google.com/s2/favicons?domain=${bookmark.url}`;
      const bookmarkURL = (!bookmark.url.toLowerCase().includes('http://')) ? `http://${bookmark.url}` : bookmark.url;
      return (
        <div key={i}>
          <img alt="" src={imageURL}/>
          <a href={bookmarkURL}>{bookmark.title}</a>
        </div>)
      });
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
    if (!this.props.userid && !this.props.error) { //WH: redirects to /login because going to / seemed to cause loop
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
          <button onClick={() => {this.logOut()}}>
            <Link to="/login">Log out</Link>
          </button><br />
          <div className='dropdown'>
            <form onChange={e => {
              this.searchFilter(e.target.value)}}>
            <input type="text" name="search" id="search" autoComplete="off" placeholder="Search" />
            </form>
            <div className="dropdown-content">
              {this.renderSearchResults()}
            </div>
          </div>
          <ul className="folder-menu-list">
            {folderModal}
            <div className="addfolder">
              <a href="#" onClick={e => this.toggleAddFolder(e)}>
                  Add Folder
              </a>
            </div>
            <li>
              <a href='#' onClick={() => this.props.dispatch(currentFolder(null))}>Unorganized Pagemarks</a>
            </li>
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
  toggleAdd: state.folders.toggleAdd,
  editing: state.folders.editing,
  currentFolderId: state.folders.currentFolderId,
  results: state.folders.results,
  userid: state.login.userid,
  email: state.login.email,
  bookmarks: state.bookmarks.bookmarks,
})

export default connect(mapStateToProps)(Folders);
