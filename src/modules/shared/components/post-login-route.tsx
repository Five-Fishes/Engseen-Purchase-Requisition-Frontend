import { connect } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IRootState } from '../reducers';

interface IPostLogInRouteProps extends RouteProps, StateProps, DispatchProps {}

const PostLogInRoute: React.FC<IPostLogInRouteProps> = (props) => {
  return (
    <>
      <Route {...props}>{!props.loggedIn && <Redirect to="/" />}</Route>
    </>
  );
};

const mapStateToProps = ({ appState }: IRootState) => ({
  loggedIn: appState.loggedIn,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostLogInRoute);
