import { FormOutlined } from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import { Menu } from "antd";
import { Link } from "react-router-dom";

interface IAppSider {
  sideBarOpened: boolean;
}

const AppSider: React.FC<IAppSider> = (props) => {
  return (
    <>
      <Sider theme="light" trigger={null} collapsible collapsed={props.sideBarOpened} width={300} className="shadow">
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
    </>
  );
};

export default AppSider;
