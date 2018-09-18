import React, { Component } from 'react';

class RoomCreate extends Component {
    render() {
        return (
            <form onSubmit={ (e) => this.props.createRoom(e) }>
                <label htmlFor='newRoom'>New Room</label>
                <input type='text' id='newRoom' onChange={ (e) => this.props.handleCreateRoom(e) } value={this.props.newRoom} />
                <input type='submit' value='Add' />
            </form>
        );
    }
}


export default RoomCreate;