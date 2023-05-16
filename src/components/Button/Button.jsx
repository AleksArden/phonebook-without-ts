import * as React from 'react';
import ButtonMui from '@mui/material/Button';
import PropTypes from 'prop-types';

const Button = ({ name, onClick, color }) => {
  return (
    <ButtonMui
      sx={{
        color: '#800080',
        fontWeight: 600,
        borderRadius: 15,
        lineHeight: 0.9,
        paddingTop: 1,
        paddingBottom: 0.85,
      }}
      color={color}
      size="large"
      onClick={onClick}
      variant="contained"
    >
      <span>{name}</span>
    </ButtonMui>
  );
};
export default Button;
Button.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
