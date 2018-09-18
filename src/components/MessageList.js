import React, { Component } from 'react';

class MessageList extends Component {
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        {this.props.messages.map( (message) =>
                            this.props.activeRoom === message.roomId && (
                            <tr key={message.key}>
                                <td>{message.username}</td>
                                <td>{message.content}</td>
                                <td>{message.sentAt}</td>
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MessageList;