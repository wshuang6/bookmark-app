import React from 'react';
import {connect} from 'react-redux';
import {fetchFolders, toggleAddFolder, editFolder, deleteFolders, currentFolder} from './actions';
import FolderModal from './folder-modal';

export class Folders extends React.Component {
  renderResults() {
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    // let folderList = this.props.folders.filter((folder) => {return folder.folderid == this.props.currentFolderId})
    let folderList = this.props.folders.map((folder) => {
      return (<li onClick={() => this.props.dispatch(currentFolder(folder.folderid))} key={folder.folderid}>
      <a href='#'>{folder.foldername}</a>
      <button onClick={() => {this.editFolder(folder)}}>Edit</button>
      <button onClick={() => {this.deleteFolder(folder.folderid)}}>Delete</button></li>)
    });
    return (folderList)
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
    let folderModal;
    if (this.props.toggleAdd || this.props.editing) {
        folderModal = <FolderModal />;
    }
    return (
      <div>
        <ul>
          {folderModal}
          <a href="#" onClick={e => this.toggleAddFolder(e)}>
              Add Folder
          </a>
          <li onClick={() => this.props.dispatch(currentFolder(null))}><a href='#'>Unorganized PageMarks</a></li>
          {this.renderResults()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state)  => ({
  folders: state.folders.folders,
  loading: state.folders.loading, 
  error: state.folders.error,
  userid: state.users.userid,
  toggleAdd: state.folders.toggleAdd,
  editing: state.folders.editing,
  currentFolderId: state.folders.currentFolderId
})

export default connect(mapStateToProps)(Folders);
