/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import decode from 'jwt-decode';
import './App.css';
import Navigation from './components/Navigation';
import Routes from './components/Routes';
import apolloClient from './apollo';

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  if (token) {
    const { exp } = decode(token);
    return exp >= Date.now() / 1000;
  }
  return !!token;
}
// TODO: remove token when expires
class App extends Component {
  state = { loggedIn: isLoggedIn(), client: apolloClient() }

  handleSignin = (token) => {
    localStorage.setItem('token', token);
    this.setState(() => ({ loggedIn: true }));
  }

  handleSignout = () => {
    localStorage.removeItem('token');
    const { client } = this.state;
    client.resetStore();
    this.setState(() => ({ loggedIn: false }));
  }

  render() {
    const { loggedIn, client } = this.state;
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Navigation
              loggedIn={loggedIn}
              signout={this.handleSignout}
            />
            <Routes loggedIn={loggedIn} signin={this.handleSignin} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
