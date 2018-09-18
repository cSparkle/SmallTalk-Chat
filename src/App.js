import React, { Component } from 'react';
import * as firebase from 'firebase';
import Rooms from './components/Rooms';
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
  render() {
    return (
      <div>
        <Rooms firebase={firebase} />
      </div>
    );
  }
}

export default App;
