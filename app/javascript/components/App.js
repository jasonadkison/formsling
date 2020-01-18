import React, { useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { BreadcrumbProvider } from "./Breadcrumb";
import { ModalProvider } from "./Modal";

import MainMenu from './MainMenu';
import Forms from './Forms';
import Usage from './Usage';
import Subscription from './Subscription';
import Account from './Account';
import FormList from './FormList';

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <MainMenu />
        <BreadcrumbProvider>
          <Switch>
            <Route path="/usage">
              <Usage />
            </Route>
            <Route path="/subscription">
              <Subscription />
            </Route>
            <Route path="/account">
              <Account />
            </Route>
            <Route path="/">
              <Forms />
            </Route>
          </Switch>
        </BreadcrumbProvider>
      </Router>
    </ModalProvider>
  );
};

export default App;
