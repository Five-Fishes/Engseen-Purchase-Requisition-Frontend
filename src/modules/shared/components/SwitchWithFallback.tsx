import { Route, Switch, SwitchProps } from "react-router";
import NoMatch from "./NoMatch";

interface ISwitchWithFallbackProps extends SwitchProps {};

const SwitchWithFallback: React.FC<ISwitchWithFallbackProps> = (props) => {
  return (
    <Switch {...props}>
      {props.children}
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
};

export default SwitchWithFallback;
