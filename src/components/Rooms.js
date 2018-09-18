import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomCreate from './RoomCreate';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoom: ''
        };
        this.roomsRef = this.props.firebase.database().ref('Rooms');
        this.createRoom = this.createRoom.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.concat( room )
            });
        });
    }

    createRoom(e) {
        e.preventDefault();
        if (!this.state.newRoom) { return }
        this.roomsRef.push({
            roomId: this.state.newRoom
        });
        this.setState({
            newRoom: ''
        });
    }

    handleCreateRoom(e) {
        this.setState({
            newRoom: e.target.value
        });
    }
    render () {
        return (
            <div>
                <h1>Current Room: {this.props.activeRoom}</h1>
                <RoomList rooms={this.state.rooms} activeRoom={this.props.activeRoom} handleRoomChange={this.props.handleRoomChange} />
                <RoomCreate createRoom={this.createRoom} handleCreateRoom={this.handleCreateRoom} newRoom={this.state.newRoom} />
            </div>
        );
    }
}

export default Rooms;