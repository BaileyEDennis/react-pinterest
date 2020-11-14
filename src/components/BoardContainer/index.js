import React, { Component } from 'react';
import BoardData from '../../helpers/data/boardData';
import BoardCard from '../cards/boardCards';

class Boards extends Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    BoardData.getBoards().then((resp) => {
      this.setState({
        boards: resp,
      });
    });
  };

  render() {
    const { boards } = this.state;
    const renderBoardsToDom = () => boards.map((board) => (
      <BoardCard key={board.firebaseKey} board={board} />
    ));
    return (
      <>
        <div className="show-boards d-flex flex-wrap">{renderBoardsToDom()}</div>
      </>
    );
  }
}

export default Boards;
