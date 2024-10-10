import { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, purple } from '@mui/material/colors';

import { AppRouter } from './routes/AppRouter';
import { Header } from './components/layout/Header';

import '@fontsource/roboto/400.css';

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: purple,
  },
});

const App: FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <AppRouter />
      </ThemeProvider>
    </Router>
  );
};

export default App;
