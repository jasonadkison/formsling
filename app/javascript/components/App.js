import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {},
    };
  }

  handleLogin = (data) => this.setState({
    isLoggedIn: true,
    user: data.user,
  })

  handleLogout = () => this.setState({
    isLoggedIn: false,
    user: {},
  })

  render () {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={} />
            <Route exact path="/login" component={} />
            <Route exact path="/register" component={} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
