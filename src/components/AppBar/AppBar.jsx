import { useSelector } from 'react-redux';
import Navigation from 'components/Navigation/Navigation';
import UserMenu from 'components/UserMenu/UserMenu';
import AuthNav from 'components/AuthNav/AuthNav';
import { selectAuthToken } from 'redux/auth/auth.selector';

import { Header, Wrapper } from './AppBar.styled';

const AppBar = () => {
  const token = useSelector(selectAuthToken);

  return (
    <Header>
      <Wrapper>
        <Navigation />
        {token ? <UserMenu /> : <AuthNav />}
      </Wrapper>
    </Header>
  );
};
export default AppBar;
