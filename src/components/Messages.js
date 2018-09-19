import React, { Component } from 'react';
import MessageList from './MessageList';
import MessageCreate from './MessageCreate';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: '',
            selectedMessage: null,
            editedMessage: ''
        };

        this.messagesRef = this.props.firebase.database().ref('messages');

        this.handleCreateMessage = this.handleCreateMessage.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.handleSelectMessage = this.handleSelectMessage.bind(this);
        this.handleEditMessage = this.handleEditMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat( message )
            });
        });
        this.messagesRef.on('child_changed', snapshot => {
            const changedMessage = snapshot.val();
            changedMessage.key = snapshot.key;
            for (let i = 0; i < this.state.messages.length; i++) {
                if (this.state.messages[i].key === changedMessage.key) {
                    let messages = this.state.messages;
                    messages[i].content = this.state.editedMessage;
                    this.setState({
                        messages: messages
                    });
                }
            }
        });
    }

    handleCreateMessage(e) {
        this.setState({
            newMessage: e.target.value
        });
    }

    createMessage(e) {
        e.preventDefault();
        var timestamp = Date.now();
        if (!this.state.newMessage) { return }
        this.messagesRef.push({
            content: this.state.newMessage,
            username: this.props.user === 'Guest' ? 'Guest' : this.props.user.displayName,
            sentAt: timestamp,
            roomId: this.props.activeRoom
        });
        this.setState({
            newMessage: ''
        });
    }

    handleSelectMessage(message) {
        this.setState({
            selectedMessage: message
        });
    }

    handleEditMessage(e) {
        this.setState({
            editedMessage: e.target.value
        });
    }

    editMessage(e, messageKey) {
        e.preventDefault();
        var newMessageData = {
            content: this.state.editedMessage
        };
        this.messagesRef.child(`${messageKey}`).update(newMessageData);
        this.setState({
            editedMessage: '',
            selectedMessage: null
        });
    }

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} activeRoom={this.props.activeRoom} handleSelectMessage={this.handleSelectMessage} handleEditMessage={this.handleEditMessage} selectedMessage={this.state.selectedMessage} editMessage={this.editMessage} />
                <MessageCreate newMessage={this.state.newMessage} handleCreateMessage={this.handleCreateMessage} createMessage={this.createMessage} />
            </div>
        );
    }
}

export default Messages;