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
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Notiflix from 'notiflix';
import { editContactThink } from 'redux/contacts/contacts.thunk';
import {
  selectCurrentContact,
  selectGetContacts,
} from 'redux/contacts/contacts.selector';
import { formReducer } from 'services/reducer';
import { closeModalEdit } from 'redux/contacts/contacts.slice';



const ChangeContact = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectGetContacts);
  const contact = useSelector(selectCurrentContact);
  const [state, reducerDispatch] = useReducer(formReducer, contact);

  const handleChange = ({ target: { value, name } }) => {
    reducerDispatch({ type: name, payload: value });
  };

  const handleClose = () => {
    dispatch(closeModalEdit());
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      id: state.id,
      item: { name: state.name, number: state.number },
    };

    const hasSameName = items.some(elem => elem.name === state.name);
    hasSameName
      ? Notiflix.Notify.warning(`${state.name} is already in contacts`, {
          position: 'center-center',
          cssAnimationStyle: 'zoom',
        })
      : dispatch(editContactThink(contact));
    dispatch(closeModalEdit());
    navigate('/contacts');
  };
  return (
    contact && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <BorderColorIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary">
              Edit Contact
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
                style={{
                  color: '#800080',
                  fontWeight: 600,
                  borderRadius: 15,
                  width: '45%',
                  marginTop: 10,
                  marginBottom: 0,
                  marginRight: 28,
                }}
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Edit
              </Button>
              <Button
                onClick={handleClose}
                style={{
                  color: '#800080',
                  fontWeight: 600,
                  borderRadius: 15,
                  width: '45%',
                  marginTop: 10,
                  marginBottom: 0,
                  backgroundColor: '#808080',
                }}
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 1 }}
              >
                Cansel
              </Button>
            </Box>
          </Box>
        </Container>
    )
  );
};
export default ChangeContact;
