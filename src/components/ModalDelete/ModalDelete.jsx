import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from 'components/Button/Button';
import {
  selectCurrentContact,
  selectOpenModalDelete,
} from 'redux/contacts/contacts.selector';
import { closeModalDelete } from 'redux/contacts/contacts.slice';
import { deleteContactThunk } from 'redux/contacts/contacts.thunk';

import { Text, List } from './ModalDelete.styled';
import { createPortal } from 'react-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 180,
  bgcolor: 'background.paper',
  borderRadius: 15,
  boxShadow: 24,
  p: 4,
};
const modalRoot = document.querySelector('#modal-root');

export default function ModalDelete() {
  const contact = useSelector(selectCurrentContact);

  const open = useSelector(selectOpenModalDelete);
  const handleDelete = () => {
    dispatch(deleteContactThunk(contact.id));
    dispatch(closeModalDelete());
  };
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeModalDelete());
  };
  return createPortal(
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: '#c0c0c0' }}>
          <Text>Delete contact?</Text>
          <List>
            <li>
              <Button name="Delete" color="error" onClick={handleDelete} />
            </li>
            <li>
              <Button name="Cancel" color="primary" onClick={handleClose} />
            </li>
          </List>
        </Box>
      </Modal>
    </div>,
    modalRoot
  );
}
