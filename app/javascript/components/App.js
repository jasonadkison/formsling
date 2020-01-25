import React, { useRef, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { BreadcrumbProvider } from "./Breadcrumb";
import { ModalProvider } from "./modals/Modal";

//import MainMenu from './MainMenu';
//import Usage from './Usage';
//import Subscription from './Subscription';
//import Account from './Account';
import FormList from './FormList';
import FormEditor from './FormEditor';
import ResultList from './ResultList';
import NotFound from './NotFound';

const App = () => {
  return (
    <ModalProvider>
      <Router>
        {/*<MainMenu />*/}
        <BreadcrumbProvider>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/forms" component={FormList} />
            <Route exact path="/forms/:id" component={FormEditor} />
            <Route exact path="/forms/:id/results" component={ResultList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BreadcrumbProvider>
      </Router>
    </ModalProvider>
  );
};

export default App;
