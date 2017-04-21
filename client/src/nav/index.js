import React from 'react';
import {connect} from 'react-redux';
import {searchBookmarks} from './actions';

export class Nav extends React.Component {
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
    if (currentSearchTerm.length === 0) {
      this.props.dispatch(searchBookmarks([]));
    } 
    else {
      this.props.dispatch(searchBookmarks(searchedArray));
    }
  }
  renderResults() {
    let list = this.props.results.map((bookmark, i) => {
      console.log(bookmark)
      const imageURL = (() => {
        if (bookmark.image) {return bookmark.image}
        return `https://www.google.com/s2/favicons?domain=${bookmark.url}`
      })();
      return (<div><img alt="" src={imageURL}/><a key={i} href={bookmark.url}>{bookmark.title}</a></div>)});
    return (list)
  }
  render () {
    return (
      <nav>
        <h3>PageMarks {this.props.login}</h3>
        <div>
          <form onChange={e => {
            console.log(e.target.value)
            this.searchFilter(e.target.value)}}>
          <input type="text" name="search" id="search" placeholder="Search" />
          </form>
          <div>
            {this.renderResults()}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state)  => ({
  login: state.login.email,
  bookmarks: state.bookmarks.bookmarks,
  results: state.nav.results
})

export default connect(mapStateToProps)(Nav);
