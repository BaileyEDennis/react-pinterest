import React from 'react';
import { Link } from 'react-router-dom';

export default function PinsCard({ pinData }) {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={pinData.imgUrl} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{pinData.name}</h5>
        <p className="card-text">{pinData.description}</p>
        <a className='btn btn-info' href={pinData.website}>Visit website</a>
        <Link className="btn btn-primary" to={`/pinData-edit/${pinData.firebaseKey}`}>
          Edit Pin
        </Link>
        <button className="btn btn-danger" onClick={ () => { this.deleteAPin(pinData.firebaseKey); } }>
          Delete Pin
        </button>
      </div>
    </div>
  );
}
