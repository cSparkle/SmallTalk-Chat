import React from 'react';

const MessageCreate = props => (
  <div>
    {/* this conditional tests whether user is set to "Guest" to determine what to show.
  If a user is set and an activeRoom is clicked, the createMessage form shows up */}
    {props.user !== 'Guest' && props.activeRoom !== null
      && (
      <form onSubmit={e => props.createMessage(e)}>
        <label htmlFor="newMessage">New Message</label>
        <input type="text" id="newMessage" onChange={e => props.handleCreateMessage(e)} value={props.newMessage} />
        <input type="submit" value="Add" />
      </form>
      )
    }
  </div>
);

export default MessageCreate;
