import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

function YoutubeBox(props) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Rect width={32} height={32} rx={3.4} fill="#00A0D1" />
      <Path
        d="M27.998 16.42s0 3.895-.494 5.773a3.007 3.007 0 01-2.115 2.115c-1.878.494-9.39.494-9.39.494s-7.492 0-9.39-.514a3.007 3.007 0 01-2.115-2.115C4 20.315 4 16.401 4 16.401s0-3.894.494-5.772A3.068 3.068 0 016.61 8.494C8.487 8 16 8 16 8s7.51 0 9.389.514a3.007 3.007 0 012.115 2.115c.514 1.878.494 5.792.494 5.792z"
        fill="#fff"
      />
      <Path d="M13.61 19.999l6.246-3.598-6.247-3.597v7.195z" fill="#00A0D1" />
    </Svg>
  );
}

export default YoutubeBox;
