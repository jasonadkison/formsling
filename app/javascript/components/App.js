import React, { useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainMenu from './MainMenu';
import Forms from './Forms';
import Usage from './Usage';
import Subscription from './Subscription';
import Account from './Account';
import FormList from './FormList';

const App = () => {
  let sidebarDomNode = useRef(null);

  return (
    <Router>
      <div id="app" className="columns">
        <div className="column">
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
              <Forms sidebarDomNode={sidebarDomNode} />
            </Route>
          </Switch>
        </div>
        <div className="is-divider-vertical" />
        <div className="column is-one-third">
          <div id="sidebar-portal" ref={sidebarDomNode} />
          <MainMenu />
        </div>
      </div>
    </Router>
  );
};

export default App;
