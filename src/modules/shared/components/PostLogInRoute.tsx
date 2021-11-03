import { useEffect, useState } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface IPostLogInRouteProps extends RouteProps {}

const PostLogInRoute: React.FC<IPostLogInRouteProps> = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loggeInStatus = Boolean(localStorage.getItem("loggedIn"));
    setLoggedIn(loggeInStatus);
  }, [loggedIn]);

  return (
    <>
      <Route {...props}>{loggedIn && <Redirect to="/" />}</Route>
    </>
  );
};

export default PostLogInRoute;
