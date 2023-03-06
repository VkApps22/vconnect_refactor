import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function BackIcon(props) {
  return (
    <Svg width={18} height={12} viewBox="0 0 18 12" fill="none" {...props}>
      <Path
        d="M18 5H3.83l3.58-3.59L6 0 0 6l6 6 1.41-1.41L3.83 7H18V5z"
        fill="#00447A"
      />
    </Svg>
  );
}

export default BackIcon;
