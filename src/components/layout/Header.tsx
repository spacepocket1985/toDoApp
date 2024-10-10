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
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px',
          }}
        >
          <Button
            color="inherit"
            onClick={() => {
              navigate(RoutePaths.MainPage);
            }}
          >
            ToDo List app
          </Button>
          <Grid>
            <Button
              color="inherit"
              onClick={() => {
                navigate(RoutePaths.SignInPage);
              }}
            >
              Sign In
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                navigate(RoutePaths.SignUpPage);
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};
