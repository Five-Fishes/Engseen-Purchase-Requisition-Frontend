import { useLocation } from "react-router-dom";

const NoMatch: React.FC = () => {

  const location = useLocation();

  return <div>
    <h1>{location.pathname} is not available</h1>
  </div>
}

export default NoMatch;