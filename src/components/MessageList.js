import React, { Component } from 'react';
import Moment from 'react-moment';

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
                                <td><Moment format='M/D/YYY h:mm:ss a'>{message.sentAt}</Moment></td>
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