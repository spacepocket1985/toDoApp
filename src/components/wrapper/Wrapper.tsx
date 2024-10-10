import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const Wrapper: React.FC<{
  children: React.ReactNode;
  title: string;
}> = ({ children, title }) => {
  return (
    <Grid
      container
      direction={'column'}
      spacing={2}
      size={3}
      sx={{
        m: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 2,
        padding: 1,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{ padding: 1, textAlign: 'center' }}
      >
        {title}
      </Typography>
      {children}
    </Grid>
  );
};
