import { Button } from '@mui/material';


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '../../routes/routePaths';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, mb: 1 }}>
      <AppBar position="static">
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: '5px',
          }}
        >
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
          <Grid></Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};
