import Stack from '@mui/joy/Stack';  
import Snackbar from '@mui/joy/Snackbar';  
import React from 'react';  

type SnackColorType = 'primary' | 'neutral' | 'danger' | 'success' | 'warning';  
type SnackVariantType = 'outlined' | 'plain' | 'soft' | 'solid';  

export const Snack: React.FC<{  
  color: SnackColorType;  
  variant: SnackVariantType;  
  open: boolean; 
  onClose: () => void; 
  children: React.ReactNode;  
}> = ({ color, variant, open, onClose, children }) => {  
  return (  
    <Stack spacing={2} sx={{ alignItems: 'center' }}>  
      <Snackbar  
        autoHideDuration={2000}  
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}  
        open={open}  
        variant={variant}  
        color={color}  
        onClose={(_, reason) => {  
          if (reason === 'clickaway') {  
            return;  
          }  
          onClose(); 
        }}  
      >  
        {children}  
      </Snackbar>  
    </Stack>  
  );  
};  