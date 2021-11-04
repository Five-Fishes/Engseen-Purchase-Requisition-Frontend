import "./App.less";
import "antd/dist/antd.less";
import React, { useState } from "react";
import Routes from "./modules/Routes";
import Layout, { Content } from "antd/lib/layout/layout";

import { BrowserRouter as Router } from "react-router-dom";
import Header from "@module/layout/component/header/header";
import AppSider from "@module/layout/component/sider/sider";

const App: React.FC = () => {
  const [sideBarOpened, setSideBarOpened] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  function triggerSideBar(): void {
    setSideBarOpened(!sideBarOpened);
  }
  function triggerLoggedIn(): void {
    if (loggedIn) {
      localStorage.setItem("loggedIn", "true");
    } else {
      localStorage.removeItem("loggedIn");
    }
    setLoggedIn(!loggedIn);
  }

  return (
    <>
      <Router>
        <Layout className="h-100">
          <AppSider sideBarOpened={sideBarOpened} />
          <Layout>
            <Header triggerSideBar={triggerSideBar} sideBarOpened={sideBarOpened} loggedIn={loggedIn} triggerLoggedIn={triggerLoggedIn} />
            <Content className="h-100 px-3 pt-3 page" style={{ backgroundColor: "#ffffff" }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
};

export default App;
