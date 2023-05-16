import * as React from 'react';
import { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Notiflix from 'notiflix';
import { addContactThunk } from 'redux/contacts/contacts.thunk';
import { selectGetContacts } from 'redux/contacts/contacts.selector';
import { formReducer } from 'services/reducer';
import { initStateAddContact } from 'services/reducer';

const AddContactPage = () => {
  const [state, reducerDispatch] = useReducer(formReducer, initStateAddContact);
  const items = useSelector(selectGetContacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = ({ target: { value, name } }) => {
    reducerDispatch({ type: name, payload: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const hasSameName = items.some(contact => contact.name === state.name);
    hasSameName
      ? Notiflix.Notify.warning(`${state.name} is already in contacts`, {
          position: 'center-center',
          cssAnimationStyle: 'zoom',
        })
      : dispatch(addContactThunk(state));
    navigate('/contacts');

    hasSameName ||
      (reducerDispatch({ type: 'name', payload: '' }) && hasSameName) ||
      reducerDispatch({ type: 'number', payload: '' });
  };

  return (
    <Container component="main" maxWidth="xs">
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
          <PersonAddAlt1Icon />
        </Avatar>
        <Typography component="h1" variant="h5" color="secondary">
          Add Contact
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            type="text"
            required
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="off"
            autoFocus
            color="secondary"
            onChange={handleChange}
            value={state.name}
          />
          <TextField
            margin="normal"
            required
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            fullWidth
            name="number"
            label="Number"
            type="tel"
            id="password"
            autoComplete="off"
            color="secondary"
            onChange={handleChange}
            value={state.number}
          />

          <Button
            style={{ borderRadius: 15 }}
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Contact
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default AddContactPage;
