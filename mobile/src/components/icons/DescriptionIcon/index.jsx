import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function DescriptionIcon(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8 16h8v2H8v-2zm0-4h8v2H8v-2zm6-10H6c-1.1 0-2 .9-2 2v16c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"
        fill="#00A0D1"
      />
    </Svg>
  );
}

export default DescriptionIcon;
