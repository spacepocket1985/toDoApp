import { Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Wrapper } from '../components/wrapper/Wrapper';
import { RoutePaths } from '../routes/routePaths';
import { useNavigate } from 'react-router-dom';

export const Main: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Grid container justifyContent={'center'}>
        <Button
          variant="contained"
          onClick={() => {
            navigate(RoutePaths.Pagination);
          }}
        >
          Pagination
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate(RoutePaths.InfiniteScroll);
          }}
        >
          InfiniteScroll
        </Button>
      </Grid>
    </Wrapper>
  );
};
