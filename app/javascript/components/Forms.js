import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  useRouteMatch,
  Switch,
  Route,
} from "react-router-dom";

import FormList from './FormList';
import FormEditor from './FormEditor';

const Forms = () => {

  const { path, url } = useRouteMatch();

  return (
    <Switch>
      <Route exact path="/app">
        <FormList />
      </Route>
      <Route path="/forms/:id/edit">
        <FormEditor />
      </Route>
    </Switch>
  );
};

export default Forms;
