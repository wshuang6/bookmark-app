import React from 'react';

export default class CreateFolder extends React.Component {
        onaNewFolder(event) {
            console.log();
        event.preventDefault();
        if (this.props.onaNewFolder) {
            this.props.onaNewFolder();
        }
    }

    render() {
        return (
            <nav>
                <ul className="clearfix">
                    <li>
                        <a className="newfolder" href="#" onClick={e => this.onaNewFolder(e)}>
                            Create New Folder
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
};
