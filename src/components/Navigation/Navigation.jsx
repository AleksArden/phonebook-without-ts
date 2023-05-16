import { useSelector } from 'react-redux';
import { selectAuthToken } from 'redux/auth/auth.selector';

import { NavList, StyledLink } from './Navigation.styled';

const Navigation = () => {
  const token = useSelector(selectAuthToken);
  return (
    <nav>
      <NavList>
        {!token ? (
          <li>
            <StyledLink to="/">Home</StyledLink>
          </li>
        ) : (
          <>
            <li>
              <StyledLink to="contacts">Contacts</StyledLink>
            </li>
            <li>
              <StyledLink to="contacts/add-contact">Add Contact</StyledLink>
            </li>
          </>
        )}
      </NavList>
    </nav>
  );
};
export default Navigation;
