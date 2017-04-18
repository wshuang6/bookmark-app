import React from 'react';
import {connect} from 'react-redux';
import {fetchFolders} from './actions';
import NewFolder from './create-folder';

export class Folders extends React.Component {
  renderResults() {
    console.log(this.props.folders);
    if(this.props.loading) {
      return <li>Loading</li>;
    }
    if(this.props.error) {
      return <li>Error</li>;
    }
    const folderList = this.props.folders.map((folder, i) => {
      return (<li key={folder.folderid}>{folder.foldername}</li>)
    });
    return (folderList)
  }

  componentDidMount() {
    this.props.dispatch(fetchFolders());
  }
  render () {
    return (
      <div>
        <NewFolder onClick={() => this.duhFolder()}/>
        <ul>
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
})

export default connect(mapStateToProps)(Folders);