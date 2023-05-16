import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavList = styled.ul`
  display: flex;
  gap: 15px;
`;
export const StyledLink = styled(NavLink)`
  padding-bottom: 32px;
  padding-top: 32px;
  color: #800080;

  font-size: 20px;
  font-weight: 500;
  &.active {
    color: #ffff00;
  }
`;
