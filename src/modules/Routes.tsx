import React from "react";
import { Switch, Route } from "react-router-dom";
import NoMatch from "./shared/components/NoMatch";
import LoginPage from "./login/pages/login";
import PurchaseRequisitionTemplateRoute from "./purchase-requisition-template/pages";
import PostLogInRoute from "./shared/components/PostLogInRoute";
import PurchaseRequisitionRequestPage from "./purchase-requisition-request/pages/purchase-requisition-request-page";
import PurchaseRequisitionSubmissionPage from "./purchase-requisition-submissioin-record/pages/purchase-requisition-submission-page";
import PurchaseOrderPage from "./purchase-order/pages/purchase-order-page";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <PostLogInRoute path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} />
      <PostLogInRoute path="/purchase-requisition-request" component={PurchaseRequisitionRequestPage} />
      <PostLogInRoute path="/purchase-requisition-submission-record" component={PurchaseRequisitionSubmissionPage}/>
      {/*       
      <PostLogInRoute path="/purchase-requisition-approval" component={PurchaseRequisitionRequestPage}/>
      */}
      <PostLogInRoute path="/purchase-order" component={PurchaseOrderPage}/> 
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
