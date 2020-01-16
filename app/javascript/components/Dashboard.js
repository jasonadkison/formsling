import React, { useState } from 'react';
import {
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";
import FormList from './FormList';
import FormResults from './FormResults';
import FormEditor from './FormEditor';
import FormExample from './FormExample';

const Dashboard = () => {

  const { path, url } = useRouteMatch();

  return (
    <div id="dashboard">
      <Switch>
        <Route exact path="/app">
          <FormList />
        </Route>
        <Route path="/forms/:id/results">
          <FormResults />
        </Route>
        <Route path="/forms/:id/edit">
          <FormEditor />
        </Route>
        <Route path="/forms/:id/example">
          <FormExample />
        </Route>
      </Switch>
    </div>
  );
};

export default Dashboard;
