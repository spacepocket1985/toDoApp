import { Box, TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchemaSignUp } from '../../utils/validationSchema';
import { _RegEndpoint, User } from '../../service/toDoApi';
import useHttp from '../../hooks/useHttp';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { Spinner } from '../spinner/Spinner';
import { Snack } from '../snack/Snack';

const Gender = ['male', 'female'];

type FormInputsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
};

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputsType>({
    resolver: yupResolver(validationSchemaSignUp),
    mode: 'onChange',
  });

  const { fetchData, isLoading, isError } = useHttp();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputsType> = async (data) => {
    const userData: User = {
      username: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      age: data.age,
    };

    const registerUser = await fetchData<string>(_RegEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (registerUser) navigate(RoutePaths.SignInPage);
    reset();
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
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        label="Name"
        type="text"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        size="small"
      />

      <TextField
        label="Email"
        type="email"
        {...register('email')}
        autoComplete=""
        error={!!errors.email}
        helperText={errors.email?.message}
        size="small"
      />
      <Box sx={{ display: 'flex', gap: 1, maxWidth: '20rem' }}>
        <TextField
          select
          label="Gender"
          defaultValue={Gender[0]}
          slotProps={{
            select: {
              native: true,
            },
          }}
          {...register('gender')}
          error={!!errors.gender}
          helperText={errors.gender?.message}
          size="small"
        >
          {Gender.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </TextField>

        <TextField
          label="age"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          {...register('age')}
          error={!!errors.age}
          helperText={errors.age?.message}
          size="small"
        />
      </Box>

      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        size="small"
      />
      <TextField
        label="Confirm password"
        type="password"
        autoComplete="current-password"
        {...register('confirmPassword')}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        size="small"
      />

      <Button type="submit" variant="contained" disabled={!isValid}>
        Submit
      </Button>
    </Box>
  ) : null;

  return (
    <>
      {spinner}
      {content}
      {isError && (
        <Snack color="danger" variant="solid">
          {isError}
        </Snack>
      )}
    </>
  );
};
