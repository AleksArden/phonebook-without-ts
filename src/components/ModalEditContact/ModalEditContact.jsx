import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { selectOpenModalEdit } from 'redux/contacts/contacts.selector';
import { closeModalEdit } from 'redux/contacts/contacts.slice';
import EditContact from 'components/EditContact/EditContact';
import { createPortal } from 'react-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 200,
  bgcolor: 'background.paper',
  borderRadius: 15,
  boxShadow: 24,
  p: 4,
};
const modalRoot = document.querySelector('#modal-root');

export default function ModalChange() {
  const dispatch = useDispatch();

  const open = useSelector(selectOpenModalEdit);

  const handleClose = () => {
    dispatch(closeModalEdit());
  };

  return createPortal(
    <div>
      <Modal
        open={open}
        style={{ borderRadius: 15 }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: '#c0c0c0', height: 380 }}>
          <EditContact />
        </Box>
      </Modal>
    </div>,
    modalRoot
  );
}
