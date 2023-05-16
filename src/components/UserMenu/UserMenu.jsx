import { useDispatch, useSelector } from 'react-redux';
import { selectUserEmail } from 'redux/auth/auth.selector';
import { logOutUserThunk } from 'redux/auth/auth.thunk';
import Button from 'components/Button/Button';

import { Wrapper, Text } from './UserMenu.styled';

const UserMenu = () => {
  const email = useSelector(selectUserEmail);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUserThunk());
  };
  return (
    <Wrapper>
      <Text style={{ color: 'greenyellow' }}>{email}</Text>
      <Button
        name="Logout"
        type="button"
        color="error"
        onClick={handleLogOut}
      />
    </Wrapper>
  );
};
export default UserMenu;
