import "./header.less";
import { Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

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
          <Button
            icon={props.sideBarOpened ? <MenuFoldOutlined style={{ color: "#FFFFFF" }} /> : <MenuUnfoldOutlined style={{ color: "#FFFFFF" }} />}
            block
            type="link"
            size="large"
            onClick={props.triggerSideBar}
          ></Button>
        </div>
        <div className="d-flex align-items-center h-100">
          <Button className="mx-3" type="default" onClick={props.triggerLoggedIn}>
            {props.loggedIn ? "Log out" : "Log in"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
