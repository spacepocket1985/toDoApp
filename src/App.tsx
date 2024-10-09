import { FC } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, purple } from '@mui/material/colors';

import { Header } from './components/layout/Header';

import '@fontsource/roboto/400.css';
import { Main } from './pages/Main';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: purple,
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main />
    </ThemeProvider>
  );
};

export default App;
