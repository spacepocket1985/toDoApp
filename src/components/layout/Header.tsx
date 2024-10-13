import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';

import { RoutePaths } from '../../routes/routePaths';
import { useAuth } from '../../context/AuthContext';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { authToken, removeAuthToken } = useAuth();

  const renderAuthButton = () => (
    <IconButton
      size="small"
      color="inherit"
      onClick={() => {
        if (!authToken) navigate(RoutePaths.SignInPage);
        else removeAuthToken();
      }}
    >
      {!authToken ? (
        <>
          <LoginIcon sx={{ mr: 1 }} />
          {'sign in'}
        </>
      ) : (
        <>
          <LogoutIcon sx={{ mr: 1 }} />
          {'sign out'}
        </>
      )}
    </IconButton>
  );

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
          <IconButton
            size={'small'}
            color="inherit"
            onClick={() => {
              navigate(RoutePaths.MainPage);
            }}
          >
            <HomeIcon color="inherit" />
            ToDo app
          </IconButton>
          <Grid>
            {renderAuthButton()}
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                navigate(RoutePaths.SignUpPage);
              }}
            >
              <>
                <PersonAddIcon sx={{ mr: 1 }} />
                {'sign Up'}
              </>
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
};
