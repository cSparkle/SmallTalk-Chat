import React, { Component } from 'react';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import Messages from './components/Messages';
import Users from './components/Users';
import './App.css';

const config = {
  apiKey: 'AIzaSyCzHaHFbmasMai7rCZ1PEdeyTDRND2YdM0',
  authDomain: 'bloc-chat-2-ace9f.firebaseapp.com',
  databaseURL: 'https://bloc-chat-2-ace9f.firebaseio.com',
  projectId: 'bloc-chat-2-ace9f',
  storageBucket: 'bloc-chat-2-ace9f.appspot.com',
  messagingSenderId: '669032856743',
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: null,
      user: 'Guest',
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  // setUser is passed to the Users component to set a user based on the authentication performed in Firebase.
  // if no user (i.e. if the person is not signed in) user is "Guest" which has no privileges.

  setUser(user) {
    if (user) {
      this.setState({
        user: user,
      });
    } else {
      this.setState({
        user: 'Guest',
      });
    }
  }

  // handleRoomChange's activeRoom state was lifted to App.js so that when a user clicks on a room (in RoomList)
  // the changed room can be sent to Messages which uses activeRoom to correlate messages in the database with the activeRoom

  handleRoomChange(room) {
    this.setState({
      activeRoom: room.roomId,
    });
  }

  render() {
    return (
      <div className="all">
        <h1 id="logo">Small Talk</h1>
        <Rooms
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          handleRoomChange={this.handleRoomChange}
          user={this.state.user}
        />
        <Messages
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          user={this.state.user}
        />
        <Users
          firebase={firebase}
          setUser={this.setUser}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default App;
