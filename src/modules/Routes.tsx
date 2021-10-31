import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NoMatch from "./shared/NoMatch";

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <div>not logged in</div>
        </Route>
        <Route path="/purchase-requisition-template">
          <h2>Page 1</h2>
        </Route>
        <Route path="/purchase-requisition-request">
          <h2>Page 2</h2>
        </Route>
        <Route path="/purchase-requisition-submission-record">
          <h2>Page 3</h2>
        </Route>
        <Route path="/purchase-requisition-approval">
          <h2>Page 4</h2>
        </Route>
        <Route path="/purchase-order">
          <h2>Page 5</h2>
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
