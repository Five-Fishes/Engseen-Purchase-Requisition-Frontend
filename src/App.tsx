import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import "antd/dist/antd.css";
import PurchaseRequisitionTemplateRoute from './pages/purchase-requisition-template';

function App() {
  return (
    <main className="m-2">
      <BrowserRouter>
        <Switch>
          <Route path="/template" component={PurchaseRequisitionTemplateRoute} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
