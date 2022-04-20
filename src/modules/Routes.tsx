import React from 'react';
import { Route } from 'react-router-dom';

import PageRefresh from './shared/components/refresh-route';
import PostLogInRoute from './shared/components/post-login-route';
import SwitchWithFallback from './shared/components/switch-with-fallback';

import LoginPage from './login/pages/login';
import PurchaseRequisitionTemplateRoute from './purchase-requisition-template/pages';
import PurchaseRequisitionRequestPage from './purchase-requisition-request/pages/purchase-requisition-request-page';
import PurchaseRequisitionApprovalPage from './purchase-requisition-approval/pages/purchase-requisition-approval-page';
import PurchaseRequisitionSubmissionPage from './purchase-requisition-submissioin-record/pages/purchase-requisition-submission-page';
import PurchaseOrderPage from './purchase-order/pages/purchase-order-page';
import OutstandingPurchaseOrderPage from './outstading-purchase-order/pages/outstanding-purchase-order-page';
import OutstandingPurchaseOrderByVendorPage from './outstanding-purchase-order-by-vendor/page/outstanding-purchase-order-by-vendor-page';
import PurchaseOrderReceiptRecordPage from './purchase-order-receipt-record/pages/purchase-order-receipt-record-page';
import PurchaseOrderReceiptCreationPage from './purchase-order-receipt-creation/pages/purchase-order-receipt-creation-page';
import { UserAuthority } from '@constant/user-authority.enum';

const Routes: React.FC = () => {
  return (
    <SwitchWithFallback>
      <Route exact path="/" component={LoginPage} />
      <Route path="/page-refresh/:destination" component={PageRefresh} /> {/* TODO: @LUXIANZE Remove this before production deployment */}
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-requisition-template" component={PurchaseRequisitionTemplateRoute} />
      <PostLogInRoute authority={UserAuthority.NORMAL} path="/purchase-requisition-request" component={PurchaseRequisitionRequestPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-requisition-submission-record" component={PurchaseRequisitionSubmissionPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-requisition-approval" component={PurchaseRequisitionApprovalPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-order" component={PurchaseOrderPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/outstanding-purchase-order" component={OutstandingPurchaseOrderPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/outstanding-purchase-order-by-vendor" component={OutstandingPurchaseOrderByVendorPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-order-receipt-record" component={PurchaseOrderReceiptRecordPage} />
      <PostLogInRoute authority={UserAuthority.ADMIN} path="/purchase-order-receipt-creation/:vendorId/:grnNo?" component={PurchaseOrderReceiptCreationPage} />
    </SwitchWithFallback>
  );
};

export default Routes;
