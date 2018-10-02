import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageList extends Component {
  render() {
    return (
      <div>
        {/* Below, messages is mapped over and each displayed accordingly based on whether they belong to the activeRoom
        none of this will show if the state of user is equal to "Guest" */}
        {this.props.user !== 'Guest'
            && (
            <div>
                {this.props.messages.map(message => this.props.activeRoom === message.roomId && (
                <ul key={message.key}>
                  <li>{message.username}</li>
                  <li>{message.content}</li>
                  <li><Moment format="M/D/YYY h:mm:ss a">{message.sentAt}</Moment></li>
                  {/* Below, if a use who created a message is the same user signed in, then the option to delete a message will appear */}
                  {this.props.user.displayName === message.username
                    && <button type="button" value="delete" onClick={() => this.props.deleteMessage(message.key)}>X</button>
                  }
                  <button type="button" onClick={() => this.props.handleSelectMessage(message.key)}>Edit</button>

                  {/* Below, the edit form is displayed but only when the message being edited is selcted */}
                  {message.key === this.props.selectedMessage
                    && (
                    <form onSubmit={e => this.props.editMessage(e, message.key)}>
                      <input type="text" id="editMessage" onChange={e => this.props.handleEditMessage(e)} />
                      <input type="submit" value="Edit" />
                    </form>
                    )
                  }
                </ul>
                ))}
            </div>
            )
        }
      </div>
    );
  }
}

export default MessageList;
