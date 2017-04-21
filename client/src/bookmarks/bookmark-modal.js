import React from 'react';
import {connect} from 'react-redux';
import './bookmark-modal.css';

import {toggleAddBookmark, createBookmarks, editBookmark, updateBookmarks} from './actions';

export class BookmarkModal extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(editBookmark(false));
        if (this.props.toggleAdd) {this.props.dispatch(toggleAddBookmark());}
    }
    postBookmark(e) {
        e.preventDefault();
        let postBody = {
            url: e.target.url.value,
            title: e.target.title.value,
            image: e.target.image.value,
            notes: e.target.notes.value,
            userid: this.props.userid,
            folderid: e.target.folderid.value
        }
        if (postBody.folderid === "default") {
            postBody.folderid = null
        }
        if (!postBody.url.toLowerCase().includes('http://')) {
            postBody.url = `http://${postBody.url}`
        }
        if (this.props.toggleAdd) {
            this.props.dispatch(createBookmarks(this.props.userid, postBody))
        } else 
        if (this.props.editing) {
            this.props.dispatch(updateBookmarks(this.props.userid, this.props.editing.bookmarkid, postBody))
        };
        this.props.dispatch(editBookmark(false));
        if (this.props.toggleAdd) {this.props.dispatch(toggleAddBookmark());}
    }
    
    render() {
        const editValues = (() => {
            if (this.props.editing) {return this.props.editing};
            return "";
        })();
        const folderSelect = this.props.folders.map((folder) => {
            return (<option value={folder.folderid}>{folder.foldername}</option>)
        })
        return (
            <div className="overlay" id="modal">
              <form onSubmit={(e) => this.postBookmark(e)}>
                <p>Bookmark URL 
                    <input type="text" name="url" id="url"
                        className="text" autoComplete="off"
                        placeholder="Bookmark URL" required defaultValue={editValues.url} />
                </p>
                <p>Bookmark name
                    <input type="text" name="title" id="title"
                        className="text" autoComplete="off"
                        placeholder="Bookmark name" required defaultValue={editValues.title} />
                </p>
                <p>Notes 
                <input type="text" name="notes" id="notes"
                    className="text" autoComplete="off"
                    placeholder="Notes" defaultValue={editValues.notes} />
                </p>
                <p>Image URL 
                <input type="text" name="image" id="image"
                    className="text" autoComplete="off"
                    placeholder="Image URL" defaultValue={editValues.image} />
                </p>
                <p>Place in Folder
                    <select name="folderid">
                        <option value="default">Unorganized PageMarks</option>
                        {folderSelect}
                    </select>
                </p>
                <input type="submit" id="guessButton" className="button" name="submit" value="Submit" />
              </form>
              <a className="close" href="#" onClick={e => this.hide(e)}>Never mind</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userid: state.login.userid,
    editing: state.bookmarks.editing,
    toggleAdd: state.bookmarks.toggleAdd,
    folders: state.folders.folders
})
export default connect(mapStateToProps)(BookmarkModal);
