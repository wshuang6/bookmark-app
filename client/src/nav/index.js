import React from 'react';
import {connect} from 'react-redux';
import './index.css';
import logo from '../logo.png';
import {searchBookmarks} from './actions';
import {removeUser} from '../login/actions';
import './index.css';
import history from '../history';
import {Link} from 'react-router-dom';

export class Nav extends React.Component {
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
  render () {
    return (
      <nav>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
        <br />
        <h3>{this.props.email}</h3>
        <div className='dropdown'>
          <form onChange={e => {
            console.log(e.target.value)
            this.searchFilter(e.target.value)}}>
          <input type="text" name="search" id="search" autoComplete="off" placeholder="Search" />
          </form>
          <div>
            <div className="dropdown-content">
              {this.renderResults()}
            </div>
          </div>
        </div>
        <button onClick={() => {this.logOut()}}><Link to="/login">Log out</Link></button>
      </nav>
    )
  }
}

const mapStateToProps = (state)  => ({
  email: state.login.email,
  bookmarks: state.bookmarks.bookmarks,
  results: state.nav.results,
  currentFolderId: state.folders.currentFolderId
})

export default connect(mapStateToProps)(Nav);
