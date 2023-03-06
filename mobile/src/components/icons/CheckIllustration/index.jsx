import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';

function CheckIllustration(props) {
  return (
    <Svg width={120} height={120} viewBox="0 0 120 120" fill="none" {...props}>
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M60 10c-27.6 0-50 22.4-50 50s22.4 50 50 50 50-22.4 50-50-22.4-50-50-50zM50 85L25 60l7.05-7.05L50 70.85 87.95 32.9 95 40 50 85z"
          fill="#6FBF4D"
        />
        <Path
          d="M50 85L25 60l7.05-7.05L50 70.85 87.95 32.9 95 40 50 85z"
          fill="#fff"
        />
      </G>
      <Defs />
    </Svg>
  );
}

export default CheckIllustration;
