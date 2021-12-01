import React from "react";
import { Route } from "react-router-dom";

import PageRefresh from "./shared/components/RefreshRoute";
import PostLogInRoute from "./shared/components/PostLogInRoute";
import SwitchWithFallback from "./shared/components/SwitchWithFallback";

import LoginPage from "./login/pages/login";
import PurchaseRequisitionTemplateRoute from "./purchase-requisition-template/pages";
import PurchaseRequisitionRequestPage from "./purchase-requisition-request/pages/purchase-requisition-request-page";
import PurchaseRequisitionApprovalPage from "./purchase-requisition-approval/pages/purchase-requisition-approval-page";
import PurchaseRequisitionSubmissionPage from "./purchase-requisition-submissioin-record/pages/purchase-requisition-submission-page";
import PurchaseOrderPage from "./purchase-order/pages/purchase-order-page";

const Routes: React.FC = () => {
  
  return (
    <SwitchWithFallback>
      <Route exact path="/" component={LoginPage} />
      <Route path="/page-refresh/:destination" component={PageRefresh} />
      <PostLogInRoute path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} />
      <PostLogInRoute path="/purchase-requisition-request" component={PurchaseRequisitionRequestPage} />
      <PostLogInRoute path="/purchase-requisition-submission-record" component={PurchaseRequisitionSubmissionPage}/>
      <PostLogInRoute path="/purchase-requisition-approval" component={PurchaseRequisitionApprovalPage}/>
      <PostLogInRoute path="/purchase-order" component={PurchaseOrderPage}/>
    </SwitchWithFallback>
  );
};

export default Routes;
