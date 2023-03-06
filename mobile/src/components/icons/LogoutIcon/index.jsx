import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

function LogoutIcon({ width, height }) {
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        d="M17 7l-1.4 1.4 2.6 2.6H8v2h10.2l-2.6 2.6L17 17l5-5-5-5zM4 19h8v2H4c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2h8v2H4v14z"
        fill="#00A0D1"
      />
    </Svg>
  );
}

LogoutIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

LogoutIcon.defaultProps = {
  width: 24,
  height: 24,
};

export default LogoutIcon;
