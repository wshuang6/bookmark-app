import React from 'react';
import {connect} from 'react-redux';
import {fetchBookmarks} from './actions';

export class Bookmarks extends React.Component {
  renderResults() {
    console.log(this.props);
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    const bookmarkList = this.props.bookmarks.map((bookmark, i) => {
      return (<li key={i}>{bookmark.url}{bookmark.title}{bookmark.notes}{bookmark.folderid}{bookmark.image}{bookmark.bookmarkid}{bookmark.userid}</li>)
    });
    return (bookmarkList)
  }

  componentDidMount() {
    this.props.dispatch(fetchBookmarks());
  }
  render () {
    return (
      <ul>
        {this.renderResults()}
      </ul>
    )
  }
}

const mapStateToProps = (state)  => ({
  bookmarks: state.bookmarks,
  loading: state.loading, 
  error: state.error,
})

export default connect(mapStateToProps)(Bookmarks);
