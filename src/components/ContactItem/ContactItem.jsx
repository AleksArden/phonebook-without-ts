import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import Button from 'components/Button/Button';
import { openModalDelete, openModalEdit } from 'redux/contacts/contacts.slice';

import { Item, TextWeight, Text } from './ContactItem.styled';

const ContactsItem = ({ contact: { name, number, id } }) => {
  const dispatch = useDispatch();

  const handleOpenModalDelete = () => {
    dispatch(openModalDelete({ name, number, id }));
  };
  const handleOpenModalEdit = () => {
    dispatch(openModalEdit({ name, number, id }));
  };

  return (
    <li>
      <table>
        <tbody>
          <tr>
            <Item>
              <PersonIcon color="secondary" fontSize="small" />
            </Item>
            <Item>
              <TextWeight>{name}</TextWeight>
            </Item>
            <Item>
              <PhoneForwardedIcon color="secondary" fontSize="small" />
            </Item>
            <Item>
              <Text>{number}</Text>
            </Item>

            <Item>
              <Button
                name="Edit"
                color="success"
                onClick={handleOpenModalEdit}
              />
            </Item>

            <Item>
              <Button
                name="Delete"
                color="error"
                onClick={handleOpenModalDelete}
              />
            </Item>
          </tr>
        </tbody>
      </table>
    </li>
  );
};
export default ContactsItem;
ContactsItem.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
