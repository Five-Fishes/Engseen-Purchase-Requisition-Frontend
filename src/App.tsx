import React, { useState } from 'react';
import 'antd/dist/antd.less';
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
import { Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
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

const App: React.FC = () => {
  const [sideBarOpened, setSideBarOpened] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Router>
        <Layout className="h-100">
          <AppSider sideBarOpened={sideBarOpened} toggleSidebar={triggerSideBar} />
          <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
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

export default App;
