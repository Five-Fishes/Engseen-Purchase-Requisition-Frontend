import React, { useState } from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.less';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Layout, { Content } from 'antd/lib/layout/layout';
import Routes from './modules/Routes';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.less';
import Header from '@module/layout/component/header/header';
import AppSider from '@module/layout/component/sider/sider';
import getMock from '@api/api-mocks.api';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { IRootState } from '@module/shared/reducers';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCA2V4P-KjtLt4QdVK4Cd8VjC0zC6reOBk',
  authDomain: 'engseen-purchaserequisition.firebaseapp.com',
  projectId: 'engseen-purchaserequisition',
  storageBucket: 'engseen-purchaserequisition.appspot.com',
  messagingSenderId: '936694149752',
  appId: '1:936694149752:web:7ca5674682789b3e21b38d',
  measurementId: 'G-2Z0L5N2FQH',
};

if (process.env.NODE_ENV === 'production') {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}
if (process.env.NODE_ENV === 'development') {
  getMock();
}

export interface IAppProps extends StateProps, DispatchProps {}

const App: React.FC<IAppProps> = (props: IAppProps) => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  
  function triggerSideBar(): void {
    setSideBarOpened(!sideBarOpened);
  }
  function triggerLoggedIn(): void {
    if (loggedIn) {
      localStorage.setItem('loggedIn', 'true');
    } else {
      localStorage.removeItem('loggedIn');
    }
    setLoggedIn(!loggedIn);
  }

  const { loading } = props;
  
  return (
    <>
      <Router>
        <Layout className="h-100">
          <AppSider sideBarOpened={sideBarOpened} toggleSidebar={triggerSideBar} />
          <Spin spinning={loading} indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}>
            <Layout>
              <Header triggerSideBar={triggerSideBar} sideBarOpened={sideBarOpened} loggedIn={loggedIn} triggerLoggedIn={triggerLoggedIn} />
              <Content className="h-100 px-3 pt-3 page" style={{ backgroundColor: '#ffffff' }}>
                <Routes />
              </Content>
            </Layout>
          </Spin>
        </Layout>
      </Router>
    </>
  );
};

const mapStateToProps = ({ appState }: IRootState) => ({
  loading: appState.loading
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(App);
