import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';
import { getContactsThunk } from 'redux/contacts/contacts.thunk';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthToken } from 'redux/auth/auth.selector';
import { selectAuthIsLoading } from 'redux/auth/auth.selector';
import LinearColor from 'components/Skeleton/Skeleton';
import {
  selectContactIsLoading,
  selectContactsError,
} from 'redux/contacts/contacts.selector';
import Error from 'components/Error/Error';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const isLoadingContact = useSelector(selectContactIsLoading);
  const isLoadingAuth = useSelector(selectAuthIsLoading);
  const error = useSelector(selectContactsError);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    dispatch(getContactsThunk());
  }, [dispatch, token]);
  return (
    <>
      {isLoadingContact && <LinearColor />}
      {isLoadingAuth && <LinearColor />}
      {error ? (
        <Error />
      ) : (
        <>
          <Outlet />
          <Filter />
          <ContactsList />
        </>
      )}
    </>
  );
};
export default ContactsPage;
