import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

import FormList from './FormList';
import FormResults from './FormResults';
import FormEditor from './FormEditor';
import FormExample from './FormExample';

const Forms = () => {

  const { path, url } = useRouteMatch();

  return (
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
  );
};

export default Forms;
