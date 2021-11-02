import Title from "antd/lib/typography/Title";
import React from "react";
import "./App.less";
import Routes from "./modules/Routes";
import Button from "antd/lib/button";
import "antd/dist/antd.less";

const App: React.FC = () => {
  return (
    <div>
      <Title type="secondary">Purchase Requisition Management App</Title>
      <Button type="primary">Primary Styled Button</Button>
      <Routes />
    </div>
  );
};

export default App;
