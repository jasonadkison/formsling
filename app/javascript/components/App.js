import React, { useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { BreadcrumbProvider } from "./Breadcrumb";
import { ModalProvider } from "./Modal";

//import MainMenu from './MainMenu';
//import Usage from './Usage';
//import Subscription from './Subscription';
//import Account from './Account';
import FormList from './FormList';
import FormEditor from './FormEditor';

const App = () => {
  return (
    <ModalProvider>
      <Router>
        {/*<MainMenu />*/}
        <BreadcrumbProvider>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/forms" component={FormList} />
            <Route path="/forms/:id">
              <FormEditor />
            </Route>
          </Switch>
        </BreadcrumbProvider>
      </Router>
    </ModalProvider>
  );
};

export default App;
