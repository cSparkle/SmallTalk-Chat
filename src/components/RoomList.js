import React, { Component } from 'react';

class RoomList extends Component {
  render() {
    return (
      <div>
        {this.props.user !== 'Guest'
            && (
            <div>
              <h1>Current Room: {this.props.activeRoom}</h1>
                {this.props.rooms.map(room => (
                  <ul key={room.key}>
                    <button type="button" onClick={() => this.props.handleRoomChange(room)}>{room.roomId}</button>
                    <button type="button" value="delete" onClick={() => this.props.deleteRoom(room.key)}>X</button>
                    {this.props.activeRoom === room.roomId
                        && (
                        <form onSubmit={e => this.props.editRoom(e, room.key)}>
                          <label htmlFor="editRoom">Edit Room Name</label>
                          <input type="text" id="editRoom" onChange={e => this.props.handleEditRoom(e)} />
                          <input type="submit" value="Edit" />
                        </form>
                        )
                    }
                  </ul>
                ))}
            </div>
            )
        }
      </div>
    );
  }
}

export default RoomList;
