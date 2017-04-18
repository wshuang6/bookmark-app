import React from 'react';

export default class FolderModal extends React.Component {
    onClose(event) {
        event.preventDefault();
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div className="overlay" id="modal">
                <div className="content">
                    <h3>New Folder Form:</h3>
                    <div>
                        <form>
                            Folder Name:
                            <input type="text" />
                            <input type="submit" value="Submit" />
                        </form>
                        <a className="close" href="#" onClick={e => this.onClose(e)}>Nevermind!</a>
                    </div>
                </div>
            </div>
        );
    }
}
