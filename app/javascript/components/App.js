import React, { useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import PortalContext from './PortalContext';
import MainMenu from './MainMenu';
import Forms from './Forms';
import Usage from './Usage';
import Subscription from './Subscription';
import Account from './Account';
import FormList from './FormList';

const App = () => {
  const sidebarDomNode = useRef(null);
  const breadcrumbDomNode = useRef(null);

  return (
    <PortalContext.Provider value={{sidebarDomNode, breadcrumbDomNode}}>
      <Router>
        <MainMenu />
        <div id="breadcrumb-portal" ref={breadcrumbDomNode} />
        <div className="box">
          <div id="app" className="columns is-marginless">
            <div className="column is-three-fifths">
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
            </div>
            <div className="is-divider-vertical" />
            <div id="sidebar-portal" className="column" ref={sidebarDomNode} />
          </div>
        </div>
      </Router>
    </PortalContext.Provider>
  );
};

export default App;
