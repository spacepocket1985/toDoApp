import { Link } from 'react-router-dom';
import { Wrapper } from '../components/wrapper/Wrapper';
import { RoutePaths } from '../routes/routePaths';

export const NotFound: React.FC = () => {
  return (
    <Wrapper title={'NotFound Page'}>
      <Link to={RoutePaths.MainPage}>Go to main</Link>
    </Wrapper>
  );
};
