import React, { Component } from 'react';

class RoomList extends Component {
    render() {
        return (
            <div>
                {this.props.rooms.map( room => 
                    <ul key={room.key}>
                        <li onClick={ () => this.props.handleRoomChange(room)}>{room.roomId}</li>

                        {this.props.activeRoom === room.roomId &&
                            <form onSubmit={ (e) => this.props.editRoom(e, room.key) }>
                                <label htmlFor="editRoom">Edit Room Name</label>
                                <input type="text" id='editRoom' onChange={ (e) => this.props.handleEditRoom(e) } />
                                <input type="submit" value='Edit'/>
                            </form>
                        }
                        
                    </ul>
                )}
            </div>
        );
    }
}

export default RoomList;