import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';

class RouterWrap extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route component={DefaultLayout} path="/"/>
        </Switch>
      </Router>
    );
  }
}

export default RouterWrap;
