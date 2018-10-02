import React, { Component } from 'react';
import swal from 'sweetalert';
import RoomList from './RoomList';
import RoomCreate from './RoomCreate';

class Rooms extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoom: '',
      editedRoom: '',
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
    this.createRoom = this.createRoom.bind(this);
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.editRoom = this.editRoom.bind(this);
    this.handleEditRoom = this.handleEditRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  // Update state and the database whenever a room is created
  componentDidMount() {
    this.roomsRef.on('child_added', (snapshot) => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState(prevState => ({
        rooms: prevState.rooms.concat(room),
      }));
    });
    // Update state and the database whenever a room is edited
    this.roomsRef.on('child_changed', (snapshot) => {
      const changedRoom = snapshot.val();
      changedRoom.key = snapshot.key;
      for (let i = 0; i < this.state.rooms.length; i++) {
        if (this.state.rooms[i].key === changedRoom.key) {
          const rooms = this.state.rooms;
          rooms[i].roomId = this.state.editedRoom;
          this.setState({
            rooms: rooms,
          });
        }
      }
    });
    // Update state and the database whenever a room is deleted
    this.roomsRef.on('child_removed', (snapshot) => {
      const deletedRoom = snapshot.val();
      deletedRoom.key = snapshot.key;
      this.setState(prevState => ({
        rooms: prevState.rooms.filter(room => room.key !== deletedRoom.key),
      }));
    });
  }

  // Grab value of input where user can create a new room
  handleCreateRoom(e) {
    this.setState({
      newRoom: e.target.value,
    });
  }

  // Creates new room
  createRoom(e) {
    e.preventDefault();
    if (!this.state.newRoom) { return; }
    this.roomsRef.push({
      roomId: this.state.newRoom,
    });
    this.setState({
      newRoom: '',
    });
  }

  // Grabs value of input where user can edit the selected room's name
  handleEditRoom(e) {
    this.setState({
      editedRoom: e.target.value,
    });
  }

  // Edits selected room name
  editRoom(e, roomKey) {
    e.preventDefault();
    if (!this.state.editedRoom) { return; }
    const newRoomName = {
      roomId: this.state.editedRoom,
    };
    this.roomsRef.child(`${roomKey}`).update(newRoomName);
    this.setState({
      editedRoom: '',
    });
  }

  // Performs checks to confirm deletion of room using sweetalert then deletes room
  deleteRoom(roomKey) {
    swal({
      title: 'Danger Zone!',
      text: "Are you sure you want to delete the room? There's no going back.",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal('Success!', 'That room has gone byebye.', 'success');
          const roomRef = this.props.firebase.database().ref(`Rooms/${roomKey}`);
          roomRef.remove();
        } else {
          swal('Oh snap!', 'Something went wrong. Try that one more time.', 'error');
        }
      });
  }

  render() {
    return (
      <div>
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
