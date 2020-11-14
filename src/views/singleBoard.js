import React from 'react';
import BoardContainer from '../components/BoardContainer';
import Auth from '../components/auth';

export default function SingleBoard({ authed }) {
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
      <h1>Single and loneley boards</h1>
      {loadComponent()}
    </div>
  );
}
