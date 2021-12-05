import { Redirect, Route, RouteProps } from "react-router-dom";

interface IPostLogInRouteProps extends RouteProps {}

const PostLogInRoute: React.FC<IPostLogInRouteProps> = (props) => {
  const loggedIn = true;

  return (
    <>
      <Route {...props}>{!loggedIn && <Redirect to="/" />}</Route>
    </>
  );
};

export default PostLogInRoute;
