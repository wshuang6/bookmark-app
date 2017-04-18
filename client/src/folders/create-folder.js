import React from 'react';

import CreateFolder from './create-folder-button';
import FolderModal from './create-folder-modal';

export default class NewFolder extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            showFolderModal: false
        };
    }

    toggleFolderModal() {
        this.setState({
            showFolderModal: !this.state.showFolderModal
        });
    }

    render() {
        let folderModal;
        if (this.state.showFolderModal) {
            folderModal = <FolderModal onClose={() => this.toggleFolderModal()} />;
        }

        return (
            <header>
                <CreateFolder onaNewFolder={() => this.toggleFolderModal()}
                    onNewFolder={this.props.onNewFolder} />
                {folderModal}
            </header>
        );
    }
};
