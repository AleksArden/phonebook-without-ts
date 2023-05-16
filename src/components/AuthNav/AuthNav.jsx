import { AuthList, StyledLink } from './AuthNav.styled';

const AuthNav = () => {
  return (
    <AuthList>
      <li>
        <StyledLink to="register">Register</StyledLink>
      </li>
      <li>
        <StyledLink to="login">Log In</StyledLink>
      </li>
    </AuthList>
  );
};
export default AuthNav;
