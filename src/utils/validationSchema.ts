import * as Yup from 'yup';

export const validationSchemaSignUp = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  gender: Yup.string().required('Gender is required'),

  age: Yup.number().min(5, 'Youre too young').required('Age is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /[A-ZА-ЯЁ]/,
      'Password strength: must have at least one uppercase letter'
    )
    .matches(
      /[a-zа-яё]/,
      'Password strength: must have at least one lowercase letter'
    )
    .matches(/[0-9]/, 'Password strength: must have at least one digit')
    .matches(
      /[^A-ZА-Яa-zа-я0-9Ёё\s]/,
      'Password must contain at least one special character(!@#$%^&*)'
    )
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
});

export const validationSchemaSignIn = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required'),

  password: Yup.string().required('Password is required'),
});
