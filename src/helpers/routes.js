import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/home';
import BoardForm from '../views/boardForm';
import Boards from '../views/boards';
import PinDetails from '../views/pinDetails';
import PinForm from '../components/forms/pinForm';
import Pins from '../views/pins';
import SingleBoard from '../views/singleBoard';
import NotFound from '../views/notFound';
import SearchResults from '../views/searchResults';

export default function Routes({ user }) {
  return (
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home user={user} />}
        />
        <Route
          exact
          path='/pin-details'
          component={() => <PinDetails user={user} />}
        />
        <Route
          exact
          path='/pins'
          component={() => <Pins user={user} />}
        />
        <Route
          exact
          path='/pin-form'
          component={() => <PinForm user={user} />}
        />
        <Route
          exact
          path='/boards/:id'
          component={(props) => <SingleBoard user={user} {...props} />}
        />
        <Route
          exact
          path='/search/:term/:type'
          component={(props) => <SearchResults {...props} />}
        />
        <Route
          exact
          path='/board-form'
          component={() => <BoardForm user={user} />}
        />
        <Route
          exact
          path='/boards'
          component={() => <Boards user={user} />}
        />
        <Route component={NotFound} />
      </Switch>
  );
}
