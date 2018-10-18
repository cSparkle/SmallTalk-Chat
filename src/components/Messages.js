import React, { Component } from 'react';
import swal from 'sweetalert';
import MessageList from './MessageList';
import MessageCreate from './MessageCreate';

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: '',
      selectedMessage: null,
      editedMessage: '',
    };

    this.messagesRef = this.props.firebase.database().ref('messages');

    this.handleCreateMessage = this.handleCreateMessage.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.handleSelectMessage = this.handleSelectMessage.bind(this);
    this.handleEditMessage = this.handleEditMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
  }

  // Update state and the database whenever a message is added
  componentDidMount() {
    this.messagesRef.on('child_added', (snapshot) => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState(prevState => ({
        messages: prevState.messages.concat(message),
      }));
    });
    // Update state and the database whenever a message is deleted
    this.messagesRef.on('child_removed', (snapshot) => {
      const deletedMessage = snapshot.val();
      deletedMessage.key = snapshot.key;
      this.setState(prevState => ({
        messages: prevState.messages.filter(message => message.key !== deletedMessage.key),
      }));
    });
    // Update state and the database whenever a message is edited
    this.messagesRef.on('child_changed', (snapshot) => {
      const changedMessage = snapshot.val();
      changedMessage.key = snapshot.key;
      for (let i = 0; i < this.state.messages.length; i++) {
        if (this.state.messages[i].key === changedMessage.key) {
          const messages = this.state.messages;
          messages[i].content = this.state.editedMessage;
          this.setState({
            messages: messages,
          });
        }
      }
    });
  }

  // Grab the value of the input where a new message is typed
  handleCreateMessage(e) {
    this.setState({
      newMessage: e.target.value,
    });
  }

  // Create all the object properties for the new message that will get stored in state and in the database
  createMessage(e) {
    e.preventDefault();
    const timestamp = Date.now();
    if (!this.state.newMessage) { return; }
    this.messagesRef.push({
      content: this.state.newMessage,
      username: this.props.user === 'Guest' ? 'Guest' : this.props.user.displayName,
      sentAt: timestamp,
      roomId: this.props.activeRoom,
    });
    this.setState({
      newMessage: '',
    });
  }

  // Allow message to be clicked and change state of selected message
  handleSelectMessage(message) {
    this.setState({
      selectedMessage: message,
    });
  }

  // Grab the value from the input where an edit to a message occurs
  handleEditMessage(e) {
    this.setState({
      editedMessage: e.target.value,
    });
  }

  // Updates the associated database reference for the selected message with the new message content
  editMessage(e, messageKey) {
    e.preventDefault();
    const newMessageData = {
      content: this.state.editedMessage,
    };
    this.messagesRef.child(`${messageKey}`).update(newMessageData);
    this.setState({
      editedMessage: '',
      selectedMessage: null,
    });
  }

  // Deletes a message from the database
  deleteMessage(messageKey) {
    swal({
      title: 'Danger Zone!',
      text: "Are you sure you want to delete your message? There's no going back.",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Success!', 'Adios, message!', 'success');
          const messageRef = this.props.firebase.database().ref(`messages/${messageKey}`);
          messageRef.remove();
        } else {
          swal('Alrighty', 'It stays put', 'error');
        }
      });
  }

  render() {
    return (
      <div id="messages">
        {this.props.user !== 'Guest' && (
        <div>
          <MessageList
            messages={this.state.messages}
            activeRoom={this.props.activeRoom}
            handleSelectMessage={this.handleSelectMessage}
            handleEditMessage={this.handleEditMessage}
            selectedMessage={this.state.selectedMessage}
            editMessage={this.editMessage}
            deleteMessage={this.deleteMessage}
            user={this.props.user}
          />
          <MessageCreate
            newMessage={this.state.newMessage}
            handleCreateMessage={this.handleCreateMessage}
            createMessage={this.createMessage}
            activeRoom={this.props.activeRoom}
            user={this.props.user}
          />
        </div>
        )}
      </div>
    );
  }
}

export default Messages;
