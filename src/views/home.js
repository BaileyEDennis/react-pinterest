import React from 'react';
import Auth from '../components/auth';

export default function Home({ authed, name }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <h3>Welcome to Pinterest!</h3>;
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      <h1>Home Page: {name}</h1>
      {loadComponent()}
    </div>
  );
}
