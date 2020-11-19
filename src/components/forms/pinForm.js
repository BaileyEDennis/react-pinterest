import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import getUser from '../../helpers/data/authData';
import { createPin, updatePin } from '../../helpers/data/pinData';
import { getAllUserBoards } from '../../helpers/data/boardData';

export default class PinForm extends Component {
  state = {
    boardId: '',
    firebaseKey: this.props.pin?.firebaseKey || '',
    description: this.props.pin?.description || '',
    name: this.props.pin?.name || '',
    imgUrl: this.props.pin?.imgUrl || '',
    private: this.props.pin?.private || false,
    userId: this.props.pin?.userId || '',
    boards: [],
  };

  componentDidMount() {
    const userId = getUser();
    getAllUserBoards(userId).then((response) => this.setState({ boards: response, userId }));
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imgUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`,
      );

      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imgUrl) => {
          this.setState({ imgUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.btn.setAttribute('disabled', 'disabled');
    if (this.state.firebaseKey === '') {
      createPin(this.state).then(() => {
        this.props.onUpdate?.();
        this.setState({ success: true });
      });
    } else {
      updatePin(this.state).then(() => {
        this.props.onUpdate?.(this.props.pin.firebaseKey);
        this.setState({ success: true });
      });
    }
  };

  handleDropdownChange(e) {
    e.preventDefault();
    this.setState({ boardId: e.target.value });
  }

  render() {
    const { success } = this.state;

    return (
      <>
        {success && (
          <div className='alert alert-success' role='alert'>
            Your Pin was Updated/Created
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              placeholder='Pin Name'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <div>
            <input
              type='text'
              name='description'
              value={this.state.description}
              onChange={this.handleChange}
              placeholder='Pin Description'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <select className='form-control form-control-lg m-2' required>
            <option value='true'>Private</option>
            <option value='false'>Public</option>
          </select>
          <select
            label='Select A Board'
            className='form-control form-control-lg m-2'
            onChange={this.handleDropdownChange}
          >
            {this.state.boards.map((board) => (
              <option value={board.firebaseKey}>{board.name}</option>
            ))}
          </select>
          <div>
            <input
              type='url'
              name='imgUrl'
              value={this.state.imgUrl}
              onChange={this.handleChange}
              placeholder='Enter an Image URL or Upload a File'
              className='form-control form-control-lg m-1'
              required
            />
          </div>
          <div>
            <input
              className='m-2'
              type='file'
              id='myFile'
              name='filename'
              accept='image/*'
              onChange={this.handleChange}
            />
          </div>
          <button
            ref={(btn) => {
              this.btn = btn;
            }}
            className='btn btn-primary m-2'
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}
