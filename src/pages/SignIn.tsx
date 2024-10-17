import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Wrapper } from '../components/wrapper/Wrapper';
import useHttp from '../hooks/useHttp';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoutePaths } from '../routes/routePaths';
import { _LoginEndpoint } from '../service/toDoApi';
import { Spinner } from '../components/spinner/Spinner';
import { Snack } from '../components/snack/Snack';

import { validationSchemaSignIn } from '../utils/validationSchema';

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

  const navigate = useNavigate();

  const { fetchData, isLoading, isError } = useHttp();

  const onSubmit: SubmitHandler<SignInInputsType> = async (data) => {
    const token = await fetchData<{ token: string }>(_LoginEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (token) {
      //  updateToken(token.token);
      navigate(RoutePaths.MainPage);
    }
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
      <Button type="submit" variant="contained" disabled>
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
