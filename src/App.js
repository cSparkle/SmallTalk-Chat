import React, { Component } from 'react';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
import Messages from './components/Messages';
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
      activeRoom: null
    };
    this.handleRoomChange = this.handleRoomChange.bind(this);
  }

  handleRoomChange(room) {
    this.setState({
      activeRoom: room.roomId
    });
  }

  render() {
    return (
      <div>
        <Rooms firebase={firebase} activeRoom={this.state.activeRoom} handleRoomChange={this.handleRoomChange} />
        <Messages firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
