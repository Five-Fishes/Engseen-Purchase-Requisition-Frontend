import React from "react";
import { Switch, Route } from "react-router-dom";

import NoMatch from "./shared/components/NoMatch";
import PageRefresh from "./shared/components/RefreshRoute";
import PostLogInRoute from "./shared/components/PostLogInRoute";

import LoginPage from "./login/pages/login";
import PurchaseRequisitionTemplateRoute from "./purchase-requisition-template/pages";
import PurchaseRequisitionRequestPage from "./purchase-requisition-request/pages/purchase-requisition-request-page";
import PurchaseRequisitionApprovalPage from "./purchase-requisition-approval/pages/purchase-requisition-approval-page";
import PurchaseRequisitionSubmissionPage from "./purchase-requisition-submissioin-record/pages/purchase-requisition-submission-page";
import PurchaseOrderPage from "./purchase-order/pages/purchase-order-page";

const Routes: React.FC = () => {
  
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/page-refresh/:destination" component={PageRefresh} />
      <PostLogInRoute path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} />
      <PostLogInRoute path="/purchase-requisition-request" component={PurchaseRequisitionRequestPage} />
      <PostLogInRoute path="/purchase-requisition-submission-record" component={PurchaseRequisitionSubmissionPage}/>
      <PostLogInRoute path="/purchase-requisition-approval" component={PurchaseRequisitionApprovalPage}/>
      <PostLogInRoute path="/purchase-order" component={PurchaseOrderPage}/>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default Routes;
