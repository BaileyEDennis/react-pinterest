import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BoardCard extends Component {
  render() {
    const { board } = this.props;

    return (
      <div className="Goat col-3" id={board.firebaseKey}>
        <div className="card">
          <img src={board.imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{board.name}</h5>
            <p className="card-text">{board.description}</p>
            <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>View Pins</Link>
          </div>
        </div>
      </div>
    );
  }
}
