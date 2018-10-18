import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.user !== 'Guest'
            && (
            <div id="messageList">
                {this.props.messages.map(message => this.props.activeRoom === message.roomId && (
                <ul className="message" key={message.key}>
                  <div id="messageModify">
                    {this.props.user.displayName === message.username
                    && (
                      <div>
                        <button className="allButtons" type="button" value="delete" onClick={() => this.props.deleteMessage(message.key)}>X</button>
                        <button className="allButtons" type="button" onClick={() => this.props.handleSelectMessage(message.key)}>Edit</button>
                      </div>
                    )}
                    {message.key === this.props.selectedMessage
                    && (
                    <form onSubmit={e => this.props.editMessage(e, message.key)}>
                      <input type="text" id="editMessage" onChange={e => this.props.handleEditMessage(e)} />
                      <input type="submit" value="Edit" />
                    </form>
                    )}
                  </div>
                  <li id="messageSent"><Moment format="h:mm:ss a">{message.sentAt}</Moment></li>
                  <li id="messageSender">{message.username}</li>
                  <li>{message.content}</li>
                </ul>
                ))}
            </div>
            )}
      </div>
    );
  }
}

export default MessageList;
