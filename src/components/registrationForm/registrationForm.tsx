import { Box, TextField, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Grid from '@mui/material/Grid2';
import { validationSchema } from '../../utils/validationSchema';
import { useState } from 'react';
import { ModalWindow } from '../modalWindow/ModalWindow';

const Gender = ['male', 'female ', 'unknown'];

type FormInputsType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: Date;
  phone: string;
};

export const RegistrationForm: React.FC = () => {
  const [regData, setData] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormInputsType>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormInputsType> = (data) => {
    setData(JSON.stringify(data));
    reset();
  };

  return (
    <>
      {regData && <ModalWindow regData={regData} />}
      <Grid
        container
        sx={{ marginTop: '20px' }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '30ch' } }}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <TextField
              required
              label="Name"
              type="text"
              {...register('name')}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              {...register('email')}
              autoComplete=""
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Phone"
              type="tel"
              {...register('phone')}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
            <TextField
              label="date of birth"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              {...register('dateOfBirth')}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth?.message}
            />
          </div>
          <div>
            <TextField
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm password"
              type="password"
              autoComplete="current-password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

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
            >
              {Gender.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </TextField>
          </div>

          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginTop: '20px' }}
          >
            <Button type="submit" variant="contained" disabled={!isValid}>
              Submit
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
};
