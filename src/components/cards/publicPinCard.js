import React from 'react';

export default function PublicPinCard({ pinData }) {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={pinData.imgUrl} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{pinData.name}</h5>
        <p className="card-text">{pinData.description}</p>
        <a className='btn btn-info' href={pinData.website}>Visit website</a>
      </div>
    </div>
  );
}
