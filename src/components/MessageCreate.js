import React from 'react';

const MessageCreate = props => (
  <div id="createMessageWrapper">
    {/* this conditional tests whether user is set to "Guest" to determine what to show.
  If a user is not "Guest"and an activeRoom is clicked, the createMessage form shows up */}
    {props.user !== 'Guest' && props.activeRoom !== null
      && (
      <form id="createMessage" onSubmit={e => props.createMessage(e)}>
        <label htmlFor="newMessage" />
        <input
          type="text"
          id="newMessage"
          onChange={e => props.handleCreateMessage(e)}
          value={props.newMessage}
        />
        <input type="submit" value="Add" />
      </form>
      )
    }
  </div>
);

export default MessageCreate;
