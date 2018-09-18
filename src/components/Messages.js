import React, { Component } from 'react';
import MessageList from './MessageList';
import MessageCreate from './MessageCreate';

class Messages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ''
        };

        this.messagesRef = this.props.firebase.database().ref('messages');
        this.handleCreateMessage = this.handleCreateMessage.bind(this);
        this.createMessage = this.createMessage.bind(this);
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat( message )
            });
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

    render() {
        return (
            <div>
                <MessageList messages={this.state.messages} activeRoom={this.props.activeRoom} />
                <MessageCreate newMessage={this.state.newMessage} handleCreateMessage={this.handleCreateMessage} createMessage={this.createMessage} />
            </div>
        );
    }
}

export default Messages;