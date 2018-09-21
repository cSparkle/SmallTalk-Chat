import React, { Component } from 'react';
import Moment from 'react-moment';

class MessageList extends Component {
    
    render() {
        return (
            <div>
                {/*Below, messages is mapped over and each displayed accordingly based on whether they belong to the active/clicked on room*/}
                {this.props.user !== 'Guest' &&
                    <div>
                        {this.props.messages.map( (message) =>
                            this.props.activeRoom === message.roomId && (
                            <ul key={message.key}>
                                <li>{message.username}</li>
                                <li>{message.content}</li>
                                <li><Moment format='M/D/YYY h:mm:ss a'>{message.sentAt}</Moment></li>
                                {this.props.user.displayName === message.username &&
                                    <button type='button' value='delete' onClick={ () => this.props.deleteMessage(message.key)}>X</button>
                                }
                                <li onClick={ () => this.props.handleSelectMessage(message.key)}>Edit</li>

                                {/*The below code displays the edit form for only the message that is clicked*/}
                                {message.key === this.props.selectedMessage &&
                                <form onSubmit={ (e) => this.props.editMessage(e, message.key) }>
                                    <input type="text" id='editMessage' onChange={ (e) => this.props.handleEditMessage(e)} />
                                    <input type="submit" value='Edit'/>
                                </form>
                                }
                            </ul>
                            )
                        )}
                    </div>
                }
            </div>
        );
    }
}

export default MessageList;