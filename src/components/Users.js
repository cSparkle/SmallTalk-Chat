import React, { Component } from 'react';

class Users extends Component {

    handleSignIn() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( provider );
    }

    handleSignOut() {
        this.props.firebase.auth().signOut().then( () => {
            alert('You have signed out');
        }).catch( () => {
            alert('Error signing out');
        })
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
    }
    render() {
        return (
            <div>
                <button type='button' value='signIn' onClick={ () => this.handleSignIn() }>Sign In</button>
                <button type='button' value='signOut' onClick={ () => this.handleSignOut() }>Sign Out</button>
                <p>User: {this.props.user === 'Guest' ? 'Guest' : this.props.user.displayName}</p>
            </div>
        );
    }
}

export default Users;