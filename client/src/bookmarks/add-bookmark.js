import React from 'react';
import {connect} from 'react-redux';

import {toggleAddBookmark} from './actions';

export class AddBookmark extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(toggleAddBookmark());
    }

    render() {
        return (
            <div className="overlay" id="modal">
              <form>
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

export default connect()(AddBookmark);
