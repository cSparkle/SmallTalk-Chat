import React, { Component } from 'react';

class RoomCreate extends Component {
  render() {
    return (
      <div>
        {/* Determines whether a user is set and displays the option to create a room if user is not equal to "Guest" */}
        {this.props.user !== 'Guest'
            && (
            <form onSubmit={e => this.props.createRoom(e)}>
              <label htmlFor="newRoom">New Room</label>
              <input
                type="text"
                id="newRoom"
                onChange={e => this.props.handleCreateRoom(e)}
                value={this.props.newRoom}
              />
              <input type="submit" value="Add" />
            </form>
            )
        }
      </div>
    );
  }
}


export default RoomCreate;
