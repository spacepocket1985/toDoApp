import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePaths } from '../routes/routePaths';
import { Wrapper } from '../components/wrapper/Wrapper';
import { Spinner } from '../components/spinner/Spinner';
import { Snack } from '../components/snack/Snack';
import { validationSchemaSignIn } from '../utils/validationSchema';

import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { clearError, login } from '../store/slices/authSlice';
import { useEffect } from 'react';

type SignInInputsType = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInInputsType>({
    resolver: yupResolver(validationSchemaSignIn),
    mode: 'onChange',
  });

  const isLoading = useAppSelector((state) => state.auth.loading);
  const isError = useAppSelector((state) => state.auth.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit: SubmitHandler<SignInInputsType> = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };

  const spinner = isLoading ? <Spinner /> : null;
  const content = !isLoading ? (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '20rem' },
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Email"
        type="email"
        autoComplete=""
        size="small"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')}
      />
      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        size="small"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Dont have an account? <Link to={RoutePaths.SignUpPage}>Register.</Link>
      </Typography>
    </Box>
  ) : null;

  return (
    <Wrapper title={'Sign in please'}>
      {spinner}
      {content}
      {isError && (
        <Snack color="danger" variant="solid">
          {isError}
        </Snack>
      )}
    </Wrapper>
  );
};

export default SignIn;
