import React, { Component } from 'react';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            username: ''
        };

        this.createUser = this.createUser.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
            if (this.props.user.displayName === null) {
                user.updateProfile({
                    displayName: this.state.username
                })
            }
            this.setState({
                username: ''
            });
        });
    }

    handleEmailInput(e) {
        this.setState({
            email: e.target.value
        });
    }

    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        });
    }

    createUser(e) {
        e.preventDefault();
        if (!this.state.username) {
            alert('You must set a username');
            return;
         }

        if (this.state.password.length < 6) {
            alert('Your password must be at least 6 characters long');
            return;
        }
        
        this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch( (error) => {
            var createErrorCode = error.code;
            var createErrorMessage = error.message;
        
            if (createErrorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(createErrorMessage);
            }
        })
        this.setState({
            email: '',
            password: ''
        });
    }

    signInUser(e) {
        e.preventDefault();
        this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch ( (error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Incorrect password');
            } else {
                alert(errorMessage);
            }
        })
        this.setState({
            email: '',
            password: ''
        });
    }

    handleCreateUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    handleGoogleSignIn() {
        const providerGoogle = new this.props.firebase.auth.GoogleAuthProvider();
        this.props.firebase.auth().signInWithPopup( providerGoogle );
    }

    handleSignOut() {
        this.props.firebase.auth().signOut().then( () => {
            alert('See ya!');
        }).catch( () => {
            alert('Error signing out');
        })
    }

    render() {
        return (
            <div>
                {/* Determine whether user is signed in and choose which button to display sign-in or sign-out*/}
                {this.props.user === 'Guest' ? (
                    <div>
                        <p>Welcome, stranger!</p>
                        <p>Create an account below:</p>
                        <form onSubmit={ (e) => this.createUser(e)}>
                            <label htmlFor='username'>Username</label>
                            <input type='text' id='username' placeholder='CattyCathy' onChange={ (e) => this.handleCreateUsername(e)} />
                            <label htmlFor='createEmail'>Email</label>
                            <input type='email' id='createEmail' placeholder='johnDoe@domain.com' onChange={ (e) => this.handleEmailInput(e)} />
                            <label htmlFor='createPassword'>Password</label>
                            <input type='password' id='createPassword' placeholder='******' onChange={ (e) => this.handlePasswordInput(e)} />
                            <input type='submit' id='submitNewUser' value='Create' />
                        </form>
                        <p>OR, create an account and sign in using Google</p>
                        <button type='button' value='signIn' onClick={ () => this.handleGoogleSignIn() }>Create account with Google</button>
                        <p>Already have an account? Sign in below:</p>
                        <form onSubmit={ (e) => this.signInUser(e)}>
                            <label htmlFor='signInEmail'>Email</label>
                            <input type='email' id='signInEmail' placeholder='janeDoe@domain.com' onChange={ (e) => this.handleEmailInput(e)} />
                            <label htmlFor='signInPassword'>Password</label>
                            <input type='password' id='signInPassword' placeholder='******' onChange={ (e) => this.handlePasswordInput(e)} />
                            <input type='submit' id='submitSignIn' value='Sign In' />
                        </form>
                        <button type='button' value='signIn' onClick={ () => this.handleGoogleSignIn() }>Sign-in using Google</button>
                    </div>
                ) : (
                    <div>
                        <p>Welcome, {this.props.user.displayName}</p>
                        <button type='button' value='signOut' onClick={ () => this.handleSignOut() }>Sign Out</button>
                        <img src={this.props.user.photoURL} alt='user icon' />
                    </div>
                )}
            </div>
        );
    }
}

export default Users;