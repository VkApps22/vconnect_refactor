import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function InstagramBox(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Rect width={32} height={32} rx={3.4} fill="#00A0D1" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.367 21.632a5.741 5.741 0 01-5.735 5.735H10.368a5.741 5.741 0 01-5.735-5.735V10.368a5.741 5.741 0 015.735-5.735h11.264a5.741 5.741 0 015.735 5.735v11.264zm-17-14.525h11.265a3.265 3.265 0 013.261 3.26v11.265a3.265 3.265 0 01-3.26 3.261H10.367a3.265 3.265 0 01-3.261-3.26V10.367a3.265 3.265 0 013.26-3.261z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 21.855A5.862 5.862 0 0110.145 16 5.862 5.862 0 0116 10.145 5.862 5.862 0 0121.855 16 5.862 5.862 0 0116 21.855zM12.619 16a3.385 3.385 0 013.38-3.38A3.385 3.385 0 0119.382 16 3.386 3.386 0 0116 19.38 3.386 3.386 0 0112.619 16z"
        fill="#fff"
      />
      <Path
        d="M22.044 11.355a1.387 1.387 0 01-1.386-1.385 1.387 1.387 0 012.77 0c0 .764-.62 1.385-1.384 1.385z"
        fill="#fff"
      />
    </Svg>
  );
}

export default InstagramBox;
