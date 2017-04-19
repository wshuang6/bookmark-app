import React from 'react';
import {connect} from 'react-redux';

import {toggleAddBookmark, createBookmarks} from './actions';

export class AddBookmark extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(toggleAddBookmark());
    }
    postBookmark(e) {
        const postBody = {
            url: e.target.url.value,
            title: e.target.title.value,
            image: e.target.image.value,
            notes: e.target.notes.value,
            userid: this.props.userid
        }
        console.log(postBody);
        this.props.dispatch(createBookmarks(this.props.userid, postBody));
    }

    render() {
        return (
            <div className="overlay" id="modal">
              <form onSubmit={(e) => this.postBookmark(e)}>
                <p>Bookmark URL 
                    <input type="text" name="url" id="url"
                        className="text" autoComplete="off"
                        placeholder="Bookmark URL" required />
                </p>
                <p>Bookmark name
                    <input type="text" name="title" id="title"
                        className="text" autoComplete="off"
                        placeholder="Bookmark name" required />
                </p>
                <p>Notes 
                <input type="text" name="notes" id="notes"
                    className="text" autoComplete="off"
                    placeholder="Notes" />
                </p>
                <p>Image URL 
                <input type="text" name="image" id="image"
                    className="text" autoComplete="off"
                    placeholder="Image URL" />
                </p>
                <input type="submit" id="guessButton" className="button" name="submit" value="Submit" />
              </form>
              <a className="close" href="#" onClick={e => this.hide(e)}>Never mind</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
      userid: state.users.userid
})
export default connect(mapStateToProps)(AddBookmark);
