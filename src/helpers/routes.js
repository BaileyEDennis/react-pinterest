import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from '../views/home';
import Boards from '../views/boards';
import Pins from '../views/pins';
import Singleboard from '../views/singleBoard';
import PinDetails from '../views/pinDetails';
import Boardform from '../views/boardForm';
import Pinform from '../views/pinForm';
import NotFound from '../views/notFound';

export default function Routes({ authed }) {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => <Home authed={authed} name="Bailey" />}
      />
      <Route
        exact
        path="/Boards"
        component={() => <Boards authed={authed} />}
      />
      <Route exact path="/Pins" component={() => <Pins />} />
      <Route
        exact
        path="/Single-board"
        component={() => <Singleboard authed={authed} />}
      />
      <Route
        exact
        path="/Pin-details"
        component={() => <PinDetails authed={authed} />}
      />
      <Route
        exact
        path="/Board-form"
        component={() => <Boardform authed={authed} />}
      />
      <Route
        exact
        path="/Pin-form"
        component={() => <Pinform authed={authed} />}
      />
      <Route component={NotFound} />
    </Switch>
  );
}
