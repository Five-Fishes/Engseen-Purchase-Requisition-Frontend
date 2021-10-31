import Title from "antd/lib/typography/Title";
import React from "react";
import "./App.less";
import Routes from "./modules/Routes";
import Button from "antd/lib/button";
import "antd/dist/antd.less";

const App: React.FC = () => {
  return (
    <div>
      <Title type="secondary">Title</Title>
      <Button type="primary">Button</Button>
      <Routes />
    </div>
  );
};

export default App;
