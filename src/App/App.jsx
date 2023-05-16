import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/Layout/Layout';
import HomePage from 'page/HomePage/HomePage';
import AddContactPage from 'page/AddContactPage/AddContactPage';
import ContactsPage from 'page/ContactsPage/ContactsPage';
import LoginPage from 'page/LoginPage/LoginPage';
import RegisterPage from 'page/RegisterPage/RegisterPage';
import { PublicRoute } from 'components/AuthRouts/PublicRoute';
import { PrivatRoute } from 'components/AuthRouts/PrivatRoute';
import { selectRefresh } from 'redux/auth/auth.selector';
import { refreshUserThunk } from 'redux/auth/auth.thunk';
import LinearColor from 'components/Skeleton/Skeleton';
import Error from 'components/Error/Error';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectRefresh);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <LinearColor />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/" element={<PrivatRoute />}>
          <Route path="/contacts" element={<ContactsPage />}>
            <Route path="/contacts/add-contact" element={<AddContactPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Error />} />
    </Routes>
  );
};
