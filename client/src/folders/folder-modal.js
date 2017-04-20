import React from 'react';
import {connect} from 'react-redux';

import {toggleAddFolder, createFolders, editFolder, updateFolders} from './actions';

export class FolderModal extends React.Component {
    hide(event) {
        event.preventDefault();
        this.props.dispatch(editFolder(false));
        if (this.props.toggleAdd) {this.props.dispatch(toggleAddFolder());}
    }
    postFolder(e) {
        e.preventDefault();
        console.log(e.target.foldername.value);
        const postBody = {
            foldername: e.target.foldername.value,
            userid: this.props.userid
        }
        if (this.props.toggleAdd) {
            this.props.dispatch(createFolders(this.props.userid, postBody))
        } else 
        if (this.props.editing) {
            this.props.dispatch(updateFolders(this.props.userid, this.props.editing.folderid, postBody))
        };
        this.props.dispatch(editFolder(false));
        if (this.props.toggleAdd) {this.props.dispatch(toggleAddFolder());}
    }

    render() {
        const editValues = (() => {
            if (this.props.editing) {return this.props.editing};
            return "";
        })();
        return (
            <div className="overlay" id="modal">
              <form onSubmit={(e) => this.postFolder(e)}>
                <p>Folder Name 
                    <input type="text" name="foldername" id="foldername"
                        className="text" autoComplete="off"
                        placeholder="Folder Name" required defaultValue={editValues.foldername} />
                </p>
                <input type="submit" id="folderButton" className="button" name="submit" value="Submit" />
              </form>
              <a className="close" href="#" onClick={e => this.hide(e)}>Never mind</a>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userid: state.users.userid,
    editing: state.folders.editing,
    toggleAdd: state.folders.toggleAdd,
})
export default connect(mapStateToProps)(FolderModal);
