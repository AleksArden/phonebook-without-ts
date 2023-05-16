import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { selectFilter } from 'redux/filter/filter.selector';
import { filterAction } from 'redux/filter/filter.slice';

const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleChange = ({ target: { value } }) => {
    dispatch(filterAction(value));
  };
  return (
    <Container component="main" maxWidth="xs" style={{ marginBottom: 36 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonSearchIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="secondary">
          Contacts
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            style={{
              width: 359,
            }}
            margin="normal"
            fullWidth
            id="name"
            label="Find contacts by name"
            name="name"
            autoComplete="off"
            autoFocus
            color="secondary"
            onChange={handleChange}
            value={filter}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default Filter;
