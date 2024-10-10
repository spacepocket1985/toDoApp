import { Box, Button, CircularProgress, TextField } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Wrapper } from '../components/wrapper/Wrapper';
import useHttp from '../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../routes/routePaths';

type SignInInputsType = {
  email: string;
  password: string;
};

export const SignIn: React.FC = () => {
  const { handleSubmit, register } = useForm<SignInInputsType>({
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const { fetchData, isLoading, isError } = useHttp();
  const _ApiBase = 'https://todo-redev.herokuapp.com/api';

  const onSubmit: SubmitHandler<SignInInputsType> = (data) => {
    fetchData(`${_ApiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((data) => {
        console.log(data);
        navigate(RoutePaths.MainPage);
      })
      .catch((er) => console.log(er));
  };

  const spinner = isLoading ? <CircularProgress size="lg" /> : null;
  const content = !isLoading ? (
    <Wrapper title={'Sign in please'}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { width: '35ch' },
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
          required
          {...register('email')}
        />
        <TextField
          label="Password"
          type="password"
          autoComplete="current-password"
          size="small"
          {...register('password')}
          required
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>

      {isError && <p>Error: {isError}</p>}
    </Wrapper>
  ) : null;

  return (
    <>
      {spinner}
      {content}
    </>
  );
};
