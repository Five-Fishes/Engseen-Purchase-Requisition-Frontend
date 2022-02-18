import { UserAuthority } from '@constant/user-authority.enum';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
import { IRootState } from '../reducers';

interface IPostLogInRouteProps extends RouteProps, StateProps, DispatchProps {
  authority: UserAuthority;
}

const PostLogInRoute: React.FC<IPostLogInRouteProps> = (props) => {
  const history = useHistory();
  const location = useLocation()

  useEffect(() => {
    const userAuthority = localStorage.getItem('authority');
    if (userAuthority) {
      if (userAuthority.toUpperCase() !== UserAuthority.ADMIN) {
        if (!location.pathname.includes('purchase-requisition-request') ) {
          history.push('/purchase-requisition-request');
        }
      }
    }
  }, [location, history]);

  const isLoggedIn = props.loggedIn;

  if (isLoggedIn) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = ({ appState }: IRootState) => ({
  loggedIn: appState.loggedIn,
  userGroup: appState.userGroup,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PostLogInRoute);
