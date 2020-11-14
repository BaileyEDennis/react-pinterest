import React, { Component } from 'react';

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
          </div>
        </div>
      </div>
    );
  }
}
