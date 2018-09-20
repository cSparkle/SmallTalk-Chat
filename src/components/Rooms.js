import React, { Component } from 'react';
import RoomList from './RoomList';
import RoomCreate from './RoomCreate';

class Rooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoom: '',
            editedRoom: ''
        };
        this.roomsRef = this.props.firebase.database().ref('Rooms');
        this.createRoom = this.createRoom.bind(this);
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.editRoom = this.editRoom.bind(this);
        this.handleEditRoom = this.handleEditRoom.bind(this);
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.concat( room )
            });
        });
        this.roomsRef.on('child_changed' , snapshot => {
            const changedRoom = snapshot.val();
            changedRoom.key = snapshot.key;
            for (let i = 0; i < this.state.rooms.length; i++) {
                if (this.state.rooms[i].key === changedRoom.key) {
                    let rooms = this.state.rooms
                    rooms[i].roomId = this.state.editedRoom;
                    this.setState({
                        rooms: rooms
                    });
                }
            }
        });
        this.roomsRef.on('child_removed', snapshot => {
            const deletedRoom = snapshot.val();
            deletedRoom.key = snapshot.key;
            this.setState({
                rooms: this.state.rooms.filter(room => room.key !== deletedRoom.key)
            });
        });
    }

    handleCreateRoom(e) {
        this.setState({
            newRoom: e.target.value
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

    handleEditRoom(e) {
        this.setState({
            editedRoom: e.target.value
        });
    }

    editRoom(e, roomKey) {
        e.preventDefault();
        if (!this.state.editedRoom) { return }
        var newRoomName = {
            roomId: this.state.editedRoom
        };
        this.roomsRef.child(`${roomKey}`).update(newRoomName);
        this.setState({
            editedRoom: ''
        });
    }

    deleteRoom(roomKey) {
        const confirmDelete = window.confirm('Are you sure you want to delete this room? This action cannot be undone.');
        if (confirmDelete) {
            const roomRef = this.props.firebase.database().ref(`Rooms/${roomKey}`);
            roomRef.remove();
        }
    }

    render () {
        return (
            <div>
                <h1>Current Room: {this.props.activeRoom}</h1>
                <RoomList 
                    rooms={this.state.rooms} 
                    activeRoom={this.props.activeRoom} 
                    handleRoomChange={this.props.handleRoomChange} 
                    editRoom={this.editRoom} 
                    handleEditRoom={this.handleEditRoom} 
                    deleteRoom={this.deleteRoom} 
                    user={this.props.user} 
                />                
                <RoomCreate 
                    createRoom={this.createRoom} 
                    handleCreateRoom={this.handleCreateRoom} 
                    newRoom={this.state.newRoom} 
                    user={this.props.user} 
                />
            </div>
        );
    }
}

export default Rooms;