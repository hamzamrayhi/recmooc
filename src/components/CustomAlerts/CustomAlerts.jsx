import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomAlerts({ isOpen, onClose, message, severity }) {


  return (
    <div style={{ width: '100%', zIndex: 9999, display: isOpen ? 'block' : 'none' }}>
      <Alert severity={severity} action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        style={{ fontSize: '16px' }} // Increase the font size here
      >
        {message}
      </Alert>
    </div>
  );
}
