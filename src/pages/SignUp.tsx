import { Typography } from '@mui/material';
import { Wrapper } from '../components/wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';
import { RegistrationForm } from '../components/registrationForm/registrationForm';

export const SignUp: React.FC = () => {
  return (
    <Wrapper title={'Sign up please'}>
      <RegistrationForm />
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account? <Link to={RoutePaths.SignInPage}>Login.</Link>
      </Typography>
    </Wrapper>
  );
};
