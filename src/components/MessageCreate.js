import React, { Component } from 'react';

class MessageCreate extends Component {
    render() {
        return (
            <form onSubmit={ (e) => this.props.createMessage(e) }>
                <label htmlFor='newMessage'>New Message</label>
                <input type='text' id='newMessage' onChange={ (e) => this.props.handleCreateMessage(e) } value={this.props.newMessage} />
                <input type='submit' value='Add' />
            </form>
        );
    }
}

export default MessageCreate;