import React from 'react';

const MessageCreate = props => (
  <div>
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
