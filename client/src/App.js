/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Routes from './components/Routes';
import client from './apollo';


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client()}>
        <Router>
          <div className="App">
            <Header />
            <Navigation />
            <Routes />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
