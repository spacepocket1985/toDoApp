import { FC } from 'react';

import { Header } from './components/layout/Header';
import { RegistrationForm } from './components/registrationForm/registrationForm';

import '@fontsource/roboto/400.css';

const App: FC = () => {
  return (
    <>
      <Header />
      <RegistrationForm />
    </>
  );
};

export default App;
