import React, { Component } from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
    };

    this.createUser = this.createUser.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
  }

  // Sets the status of the user when a user elects to login or create account
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged((user) => {
      this.props.setUser(user);
      if (this.props.user.displayName === null) {
        user.updateProfile({
          displayName: this.state.username,
        });
      }
      this.setState({
        username: '',
      });
    });
  }

  // Grabs value of input where user provides email address
  handleEmailInput(e) {
    this.setState({
      email: e.target.value,
    });
  }

  // Grabs value of input where user provides password
  handlePasswordInput(e) {
    this.setState({
      password: e.target.value,
    });
  }

  // Performs checks to ensure satisfactory username and password and uses sweetalert for alerts.
  // Assuming tests pass, new user is created using authorization service provided by Firebase
  createUser(e) {
    e.preventDefault();
    if (!this.state.username) {
      swal('So close!', 'You need to set a username before you can continue', 'error');
      return;
    }

    if (this.state.password.length < 6) {
      swal('Not quite!', 'Your password must be at least 6 characters long', 'error');
      return;
    }

    this.props.firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const createErrorCode = error.code;
      const createErrorMessage = error.message;

      if (createErrorCode === 'auth/weak-password') {
        swal('Weeeeeak', 'Your password is a little weak. Try something a little more complex', 'error');
      } else {
        swal(createErrorMessage);
      }
    });
    this.setState({
      email: '',
      password: '',
    });
  }

  // Uses authorization provided by Firebase to sign in a user with email and password
  signInUser(e) {
    e.preventDefault();
    this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/wrong-password') {
        swal('Nope', "That's not the correct password. Try again.", 'error');
      } else {
        swal(errorMessage);
      }
    });
    this.setState({
      email: '',
      password: '',
    });
  }

  // Grabs value of input where user can create username
  handleCreateUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  // Uses Google authentication to sign-in or sign-up a user
  handleGoogleSignIn() {
    const providerGoogle = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(providerGoogle);
  }

  // Signs out user and alerts using sweetalert
  handleSignOut() {
    this.props.firebase.auth().signOut().then(() => {
      swal('See ya!', "You're all signed out.", 'success');
    }).catch(() => {
      swal('Whoops!', 'There was an error. Try that again.', 'error');
    });
  }

  render() {
    return (
      <div>
        {/* Determine whether user is signed in. Displays sign-up/sign-in form if no user set */}
        {this.props.user === 'Guest' ? (
          <div className="container">
            <div className="row justify-content-center m-5">
              <h2 className="col-4">Welcome, stranger!</h2>
            </div>
            <div className="row mb-5">
              <div className="col-sm-8 col-md-5 shadow-lg my-3 mx-auto bg-dark text-light">
                <p className="text-center mt-3">Create an account below:</p>
                <form onSubmit={e => this.createUser(e)}>
                  <label htmlFor="username">Username</label>
                  <input className="form-control" type="text" id="username" placeholder="CattyCathy" onChange={e => this.handleCreateUsername(e)} />
                  <label htmlFor="createEmail">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="createEmail"
                    placeholder="johnDoe@domain.com"
                    onChange={e => this.handleEmailInput(e)}
                  />
                  <label htmlFor="createPassword">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id="createPassword"
                    placeholder="******"
                    onChange={e => this.handlePasswordInput(e)}
                  />
                  <input className="btn btn-secondary btn-block my-4" type="submit" id="submitNewUser" value="Create" />
                </form>
                <p className="text-center mt-5">OR, create an account and sign in using Google</p>
                <button
                  className="btn btn-secondary btn-block my-4"
                  type="button"
                  value="signIn"
                  onClick={() => this.handleGoogleSignIn()}
                >
                  Create account with Google
                </button>
              </div>

              <div className="col-sm-8 col-md-5 shadow-lg my-3 mx-auto bg-dark text-light">
                <p className="text-center mt-3">Already have an account? Sign in below:</p>
                <form onSubmit={e => this.signInUser(e)}>
                  <label htmlFor="signInEmail">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="signInEmail"
                    placeholder="janeDoe@domain.com"
                    onChange={e => this.handleEmailInput(e)}
                  />
                  <label htmlFor="signInPassword">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    id="signInPassword"
                    placeholder="******"
                    onChange={e => this.handlePasswordInput(e)}
                  />
                  <input className="btn btn-secondary btn-block my-4" type="submit" id="submitSignIn" value="Sign In" />
                </form>
                <button
                  className="btn btn-secondary btn-block my-4"
                  type="button"
                  value="signIn"
                  onClick={() => this.handleGoogleSignIn()}
                >
                  Sign-in using Google
                </button>
              </div>
            </div>
          </div>
          // If user is signed in, only the code below is run
        ) : (
          <div>
            <p>Welcome, {this.props.user.displayName}</p>
            <button type="button" value="signOut" onClick={() => this.handleSignOut()}>Sign Out</button>
          </div>
        )}
      </div>
    );
  }
}

// Type checking to ensure the prop setUser is sent as a function
Users.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Users;
