import React from 'react';
import { RouteComponentProps, Route, Switch } from 'react-router-dom';
import PurchaseRequisitionTemplateList from './purchase-requisition-template-list';

const Routes: React.FC<RouteComponentProps> = ({ match }) => (
  <>
    <Switch>
      <Route path={match.url} component={PurchaseRequisitionTemplateList} />
    </Switch>
  </>
);

export default Routes;
