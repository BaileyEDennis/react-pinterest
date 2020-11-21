import React from 'react';
import AppModal from '../appModal';
import PinForm from '../forms/pinForm';

export default function PinsCard({ pinData, pinDataFunc, onUpdate }) {
  return (
    <div className="card m-2">
      <img className="card-img-top" src={pinData.imgUrl} alt="Card cap" />
      <div className="card-body">
        <h5 className="card-title">{pinData.name}</h5>
        <p className="card-text">{pinData.description}</p>
        <a className='btn btn-info' href={pinData.website}>Visit website</a>
        <AppModal
         title={'Update Pin'}
         buttonLabel={'Update Pin'}
         btnColor={'info'}
         icon={'fa-plus-circle'}>
         <PinForm pin={pinData} onUpdate={onUpdate}></PinForm>
        </AppModal>
        <button onClick={ () => { pinDataFunc(pinData.firebaseKey); } }className='btn btn-dark delete-pin pin-buttons'>
          <i className='far fa-trash-alt'></i> Delete Pin
        </button>
      </div>
    </div>
  );
}
