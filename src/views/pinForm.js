import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/auth';

export default function PinForm({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <BoardContainer />;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      <h1>Pin Ferrm</h1>
      {loadComponent()}
    </div>
  );
}
