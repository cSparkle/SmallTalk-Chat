import React, { Component } from 'react';
import RoomList from './RoomList';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('Rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.concat( room )
            });
            console.log(this.state.rooms);
        });
    }
    render () {
        return (
            <div>
                <RoomList rooms={this.state.rooms} />
            </div>
        );
    }
}

export default Rooms;