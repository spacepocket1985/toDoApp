import Grid from '@mui/material/Grid2';

export const Wrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Grid
      container
      direction={'column'}
      spacing={2}
      size={2}
      sx={{
        m: 'auto',
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 2,
        padding: 1,
      }}
    >
      {children}
    </Grid>
  );
};
