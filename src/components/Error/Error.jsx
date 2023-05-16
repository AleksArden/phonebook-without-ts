import React from 'react';
import { Box, Typography } from '@mui/material';

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h2" color="error" style={{ marginBottom: 50 }}>
        Oops!
      </Typography>
      <Typography variant="h1" color="secondary">
        ERROR 404
      </Typography>
      <Typography variant="h4" style={{ color: '#adff2f', marginTop: 50 }}>
        You seem to be lost.
      </Typography>
    </Box>
  );
}
