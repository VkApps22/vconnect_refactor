import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

function FacebookBox(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M28.571 0H3.43A3.429 3.429 0 000 3.428v25.143A3.428 3.428 0 003.429 32h9.803V21.12h-4.5V16h4.5v-3.903c0-4.44 2.643-6.891 6.69-6.891 1.94 0 3.967.345 3.967.345v4.357h-2.234c-2.2 0-2.887 1.366-2.887 2.767V16h4.913l-.786 5.12h-4.127V32h9.803A3.429 3.429 0 0032 28.57V3.428A3.429 3.429 0 0028.571 0z"
          fill="#00A0D1"
        />
        <Path
          d="M13.232 21.12V32h5.536V21.12h4.127l.786-5.12h-4.913v-3.325c0-1.4.686-2.766 2.887-2.766h2.234V5.55s-2.028-.345-3.966-.345c-4.048 0-6.69 2.452-6.69 6.891V16h-4.5v5.12h4.5z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h32v32H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default FacebookBox;
