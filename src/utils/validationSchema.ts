import * as Yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  gender: Yup.string().required('Gender is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  dateOfBirth: Yup.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .required('Date of birth is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /[A-ZА-ЯЁ]/,
      'Password strength: must have at least one uppercase letter'
    )
    .min(6, 'Password must have at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Confirm Password does not match'),
});
