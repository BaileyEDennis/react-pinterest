import React from 'react';
import { getAllUserBoards, deleteBoard, getBoardPins } from '../helpers/data/boardData';
import BoardsCard from '../components/cards/boardCards';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/forms/boardForm';
import AppModal from '../components/appModal';
import { deletePinsOfBoards } from '../helpers/data/pinData';

// update boardData, clean up firebase data, update singleBoard
export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState(
        {
          boards: response,
        },
        this.setLoading,
      );
    });
  };

  deleteBoard = (firebaseKey) => {
    deleteBoard(firebaseKey);
    getBoardPins(firebaseKey).then((response) => {
      response.forEach((pin) => {
        deletePinsOfBoards(pin.firebaseKey);
      });
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => boards.map((board) => (
        <BoardsCard key={board.firebaseKey} board={board} boardDataFunction={this.deleteBoard} />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
          <BoardForm onUpdate={this.getBoards}/>
          </AppModal>
            <h2>Here are all of your boards</h2>
            <div className="d-flex flex-wrap container">{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
