import "./App.less";
import "antd/dist/antd.less";
import React, { useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import Routes from "./modules/Routes";
import Header from "@module/layout/component/header";
import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import { Link, BrowserRouter as Router } from "react-router-dom";

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
          <Sider theme="light" trigger={null} collapsible collapsed={sideBarOpened} width={300}>
            <div className="shadow" style={{ height: "58px", minHeight: "58px", backgroundColor: "#721959" }} />
            <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1" icon={<FormOutlined />}>
                <Link className="router-link" to="/purchase-requisition-template">
                  Purchase Requisition Template
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FormOutlined />}>
                <Link className="router-link" to="/purchase-requisition-request">
                  Purchase Requisition Request
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<FormOutlined />}>
                <Link className="router-link" to="/purchase-requisition-submission-record">
                  Purchase Requisition Submission
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<FormOutlined />}>
                <Link className="router-link" to="/purchase-requisition-approval">
                  Purchase Requisition Approval
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FormOutlined />}>
                <Link className="router-link" to="/purchase-order">
                  Purchase Order
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header triggerSideBar={triggerSideBar} sideBarOpened={sideBarOpened} loggedIn={loggedIn} triggerLoggedIn={triggerLoggedIn} />
            <Content className="h-100 px-3 pt-3">
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    </>
  );
};

export default App;
