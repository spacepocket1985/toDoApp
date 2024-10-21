import { Typography } from '@mui/material';
import { Wrapper } from '../components/wrapper/Wrapper';
import { Link } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';
import { RegistrationForm } from '../components/registrationForm/registrationForm';
import { useEffect } from 'react';
import { clearError } from '../store/slices/authSlice';
import { useAppDispatch } from '../hooks/storeHooks';

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);
  return (
    <Wrapper title={'Sign up please'}>
      <RegistrationForm />
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account? <Link to={RoutePaths.SignInPage}>Login.</Link>
      </Typography>
    </Wrapper>
  );
};

export default SignUp;
