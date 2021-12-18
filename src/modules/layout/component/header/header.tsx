import './header.less';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import React from 'react';

interface IHeaderProps {
  readonly sideBarOpened: boolean;
  readonly triggerSideBar: () => void;
  readonly loggedIn: boolean;
  readonly triggerLoggedIn: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  return (
    <>
      <div className="d-flex header shadow justify-content-between">
        <div className="d-flex align-items-center h-100">
          {props.loggedIn && <Button icon={<MenuOutlined style={{ color: '#FFFFFF', fontSize: '22px' }} />} block type="link" size="large" className="mx-3" onClick={props.triggerSideBar}></Button>}
        </div>
        <div className="d-flex align-items-center h-100">
          <Button className="mx-3" type="default" onClick={props.triggerLoggedIn}>
            {props.loggedIn ? 'Log out' : 'Log in'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
