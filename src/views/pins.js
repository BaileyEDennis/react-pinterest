import React from 'react';
import {
  getUserPins,
  deletePin,
  deletePinsOfBoards,
  getpinsOfBoards,
} from '../helpers/data/pinData';
import PinsCard from '../components/cards/pinCards';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import PinForm from '../components/forms/pinForm';
import AppModal from '../components/appModal';

// update boardData, clean up firebase data, update singleBoard
export default class Boards extends React.Component {
  state = {
    pins: [],
    loading: true,
  };

  deleteAPin = (firebaseKey) => {
    deletePin(firebaseKey);
    getpinsOfBoards(firebaseKey).then((response) => {
      response.forEach((pin) => {
        deletePinsOfBoards(pin.firebaseKey);
      });
    });
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const currentUserId = getUid();
    getUserPins(currentUserId).then((response) => {
      this.setState(
        {
          pins: response,
        },
        this.setLoading,
      );
    });
  };

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, loading } = this.state;
    const showPins = () => pins.map((pin) => (
      <PinsCard key={pin.firebaseKey} pinData={pin} pinDataFunc={this.deleteAPin} onUpdate={this.getPins} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create A Pin'} buttonLabel={'Create A Pin'}>
          <PinForm onUpdate={this.getPins}/>
          </AppModal>
            <h2>Here are all of your Pins</h2>
            <div className="d-flex flex-wrap container">{showPins()}</div>
          </>
        )}
      </>
    );
  }
}
