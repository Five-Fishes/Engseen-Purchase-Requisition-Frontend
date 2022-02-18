import React from 'react';

import './header.less';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import { IRootState } from '@module/shared/reducers';
import { logout } from '@module/shared/reducers/app-reducers';
import { useHistory } from 'react-router-dom';

interface IHeaderProps extends StateProps, DispatchProps {
  readonly sideBarOpened: boolean;
  readonly triggerSideBar: () => void;
}

const Header: React.FC<IHeaderProps> = (props) => {
  const history = useHistory();

  const logInLogOutHandler = () => {
    if (props.loggedIn) {
      props.logout();
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <div className="d-flex header shadow justify-content-between">
        <div className="d-flex align-items-center h-100">
          {props.loggedIn && <Button icon={<MenuOutlined style={{ color: '#FFFFFF', fontSize: '22px' }} />} block type="link" size="large" className="mx-3" onClick={props.triggerSideBar}></Button>}
        </div>
        <div className="d-flex align-items-center h-100">
          <Button className="mx-3" type="default" onClick={logInLogOutHandler}>
            {props.loggedIn ? 'Log out' : 'Log in'}
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ appState }: IRootState) => ({
  loggedIn: appState.loggedIn,
});

const mapDispatchToProps = {
  logout,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
