import React from "react";
import { Switch, Route } from "react-router-dom";
import NoMatch from "./shared/components/NoMatch";
import PurchaseRequisitionTemplateRoute from "./purchase-requisition-template/pages";
import LoginPage from "./login/pages/login";
import PostLogInRoute from "./shared/components/PostLogInRoute";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PostLogInRoute path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} />
      {/* <Route path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} /> */}
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
  );
};

export default Routes;
