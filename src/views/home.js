import React from 'react';
import Auth from '../components/auth';
import Loader from '../components/Loader';
import PublicPins from '../components/publicPins';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = <PublicPins />;
    } else {
      component = <Auth />;
    }
    return component;
  };

  return (
    <div>
      <h1>Welcome to React-Pinterest</h1>
      {loadComponent()}
    </div>
  );
}
