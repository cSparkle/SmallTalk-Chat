import React, { Component } from 'react';

class RoomCreate extends Component {
  render() {
    return (
      <div>
        {this.props.user !== 'Guest'
            && (
            <form onSubmit={e => this.props.createRoom(e)}>
              <label htmlFor="newRoom">New Room</label>
              <input type="text" id="newRoom" onChange={e => this.props.handleCreateRoom(e)} value={this.props.newRoom} />
              <input type="submit" value="Add" />
            </form>
            )
        }
      </div>
    );
  }
}


export default RoomCreate;
