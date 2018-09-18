import React, { Component } from 'react';

class RoomList extends Component {
    render() {
        return (
            <div>
                {this.props.rooms.map( room => 
                    <ul key={room.key}>
                        <li>{room.roomId}</li>
                    </ul>
                )}
            </div>
        );
    }
}

export default RoomList;