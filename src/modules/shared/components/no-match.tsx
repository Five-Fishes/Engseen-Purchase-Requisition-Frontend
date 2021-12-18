import Title from 'antd/lib/typography/Title';
import { useLocation } from 'react-router-dom';

const NoMatch: React.FC = () => {
  const location = useLocation();
  const sanitisedPath: string = location.pathname.replace(/\/|-/g, ' ').trim() + ' page';

  return (
    <div className="d-flex justify-content-center h-100">
      <Title className="align-self-center text-center p-5" type="secondary">
        {sanitisedPath} is not available
      </Title>
    </div>
  );
};

export default NoMatch;
