import React, { Component } from 'react';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import Messages from './components/Messages';
import Users from './components/Users';
import './App.css';

var config = {
  apiKey: "AIzaSyCzHaHFbmasMai7rCZ1PEdeyTDRND2YdM0",
  authDomain: "bloc-chat-2-ace9f.firebaseapp.com",
  databaseURL: "https://bloc-chat-2-ace9f.firebaseio.com",
  projectId: "bloc-chat-2-ace9f",
  storageBucket: "bloc-chat-2-ace9f.appspot.com",
  messagingSenderId: "669032856743"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeRoom: null,
      user: 'Guest'
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  handleRoomChange(room) {
    this.setState({
      activeRoom: room.roomId
    });
  }

  setUser(user) {
    if(user) {
      this.setState({
        user: user
      });
    } else {
      this.setState({
        user: 'Guest'
      });
    }
  }

  render() {
    return (
      <div>
        <Rooms firebase={firebase} activeRoom={this.state.activeRoom} handleRoomChange={this.handleRoomChange} user={this.state.user} />
        <Messages firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user} />
        <Users firebase={firebase} setUser={this.setUser} user={this.state.user} />
      </div>
    );
  }
}

export default App;
