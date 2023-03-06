import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function EmailIllustration(props) {
  return (
    <Svg width={96} height={96} viewBox="0 0 96 96" fill="none" {...props}>
      <Rect width={96} height={96} rx={8} fill="#E5EEF4" />
      <Path
        d="M74.667 32c0-2.933-2.4-5.333-5.333-5.333H26.667c-2.933 0-5.333 2.4-5.333 5.333v32c0 2.933 2.4 5.333 5.333 5.333h42.667c2.933 0 5.333-2.4 5.333-5.333V32zm-5.333 0L48.001 45.333 26.667 32h42.667zm0 32H26.667V37.333l21.334 13.334 21.333-13.334V64z"
        fill="#00447A"
      />
    </Svg>
  );
}

export default EmailIllustration;
