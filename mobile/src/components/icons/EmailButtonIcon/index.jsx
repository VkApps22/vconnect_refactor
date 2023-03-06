import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

function EmailButtonIcon(props) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Circle cx={20} cy={20} r={20} fill="#E0F2FE" />
      <Path
        d="M28.333 15c0-.917-.75-1.667-1.666-1.667H13.333c-.916 0-1.666.75-1.666 1.667v10c0 .917.75 1.667 1.666 1.667h13.334c.916 0 1.666-.75 1.666-1.667V15zm-1.666 0L20 19.167 13.333 15h13.334zm0 10H13.333v-8.333L20 20.833l6.667-4.166V25z"
        fill="#00A0D1"
      />
    </Svg>
  );
}

export default EmailButtonIcon;
