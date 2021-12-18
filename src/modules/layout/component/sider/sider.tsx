import { DownloadOutlined, FileDoneOutlined, FileOutlined, FileTextOutlined, HistoryOutlined, LaptopOutlined } from '@ant-design/icons';
import { Drawer, Menu } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';

interface IAppSider {
  sideBarOpened: boolean;
  toggleSidebar?: () => void;
}

const AppSider: React.FC<IAppSider> = (props) => {
  return (
    <>
      {/* <Sider theme="light" trigger={null} collapsible collapsed={props.sideBarOpened} width={300} collapsedWidth={0} className="shadow"> */}
      <Drawer
        title={
          <span className="d-inline-flex align-items-center text-white">
            <LaptopOutlined />
            &nbsp;&nbsp;Purchasing System
          </span>
        }
        placement="left"
        onClose={props.toggleSidebar}
        closable={false}
        visible={props.sideBarOpened}
        key="app-sidebar"
        headerStyle={{
          height: '58px',
          minHeight: '58px',
          backgroundColor: '#721959',
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<FileOutlined />}>
            <Link className="router-link" to="/purchase-requisition-template">
              Purchase Template
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<FileTextOutlined />}>
            <Link className="router-link" to="/purchase-requisition-request">
              Purchase Requisition
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<HistoryOutlined />}>
            <Link className="router-link" to="/purchase-requisition-submission-record">
              Submission Record
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileDoneOutlined />}>
            <Link className="router-link" to="/purchase-requisition-approval">
              Purchase Approval
            </Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DownloadOutlined />}>
            <Link className="router-link" to="/purchase-order">
              Download PO
            </Link>
          </Menu.Item>
        </Menu>
      </Drawer>
      {/* </Sider> */}
    </>
  );
};

export default AppSider;
