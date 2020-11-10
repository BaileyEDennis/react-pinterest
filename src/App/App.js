import React from 'react';
import firebase from 'firebase/app';
import fbConnection from '../helpers/data/connection';
import './App.scss';
import Auth from '../components/auth/index';

fbConnection();
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Auth />
      </div>
    );
  }
}

export default App;
