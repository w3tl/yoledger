/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import decode from 'jwt-decode';
import './App.css';
import Header from './components/Header';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: isLoggedIn(),
      client: apolloClient(),
    };
  }

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
            <Header />
            <Navigation
              loggedIn={loggedIn}
              handleSignin={this.handleSignin}
              handleSignout={this.handleSignout}
            />
            <Routes loggedIn={loggedIn} />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
