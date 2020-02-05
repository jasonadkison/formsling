import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { BreadcrumbProvider } from "./BreadcrumbPortal";
import { ModalProvider } from "./modals/Modal";
import FormList from './FormList';
import FormEditor from './FormEditor';
import ResultList from './ResultList';
import NotFound from './NotFound';

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <BreadcrumbProvider>
          <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/forms" component={FormList} />
            <Route exact path="/forms/:id" component={FormEditor} />
            <Route exact path="/forms/:formId/results" component={ResultList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </BreadcrumbProvider>
      </Router>
    </ModalProvider>
  );
};

export default App;
