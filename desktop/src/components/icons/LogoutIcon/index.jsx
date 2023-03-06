import React from 'react';
import PropTypes from 'prop-types';

const LogoutIcon = ({ fill, ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    {...props}
  >
    <path
      d="M17 7L15.6 8.4L18.2 11H8V13H18.2L15.6 15.6L17 17L22 12L17 7ZM4 19H12V21H4C2.9 21 2 20.1 2 19V12V5C2 3.9 2.9 3 4 3H12V5H4V12V19Z"
      fill="#00A0D1"
    />
  </svg>
);

LogoutIcon.propTypes = {
  fill: PropTypes.string,
};

LogoutIcon.defaultProps = {
  fill: '',
};

export default LogoutIcon;
