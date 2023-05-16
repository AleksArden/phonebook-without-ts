import { useSelector } from 'react-redux';
import ContactsItem from 'components/ContactItem/ContactItem';
import ModalChange from 'components/ModalEditContact/ModalEditContact';
import ModalDelete from 'components/ModalDelete/ModalDelete';
import {
  selectFilterContacts,
  selectGetContacts,
} from 'redux/contacts/contacts.selector';

import { List, Text } from './ContactsList.styled';

const ContactsList = () => {
  const filteredItems = useSelector(selectFilterContacts);
  const items = useSelector(selectGetContacts);

  return items.length === 0 ? (
    <Text>There is no contact in your PHONEBOOK</Text>
  ) : filteredItems.length === 0 ? (
    <Text>There is no such contact in your PHONEBOOK</Text>
  ) : (
    <>
      <List>
        {filteredItems.map(contact => (
          <ContactsItem key={contact.id} contact={contact} />
        ))}
      </List>
      <ModalDelete />
      <ModalChange />
    </>
  );
};
export default ContactsList;
