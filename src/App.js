import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import RootRouter from './RootRouter';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyAocW8dgwL3uFPlNpIGFzswJCg78JoZHF0",
     authDomain: "mashinchand-9b50d.firebaseapp.com",
     databaseURL: "https://mashinchand-9b50d.firebaseio.com",
     storageBucket: "mashinchand-9b50d.appspot.com",
     messagingSenderId: "984323938047"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RootRouter />
      </Provider>
    );
  }
}

export default App;
