import * as React from 'react';
import Svg, {
  Circle,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import PropTypes from 'prop-types';

function EmojiNormal({ disabled, ...props }) {
  return disabled ? (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Circle cx={20} cy={20} r={20} fill="#E5E5E5" />
      <Ellipse
        cx={27.5}
        cy={16.667}
        rx={2.5}
        ry={3.333}
        fill="#000"
        fillOpacity={0.6}
      />
      <Ellipse
        cx={12.5}
        cy={16.667}
        rx={2.5}
        ry={3.333}
        fill="#000"
        fillOpacity={0.6}
      />
      <Path
        d="M10.834 24a1 1 0 100 2v-2zm18.333 2a1 1 0 100-2v2zm-18.333-1v1h9.167v-2h-9.132-.003-.005-.007-.002-.002-.002-.001-.002-.001-.002-.001-.001-.001-.001-.001-.001-.001-.001v1zm9.167 1H29.167v-1-1H20v2z"
        fill="#000"
        fillOpacity={0.6}
      />
    </Svg>
  ) : (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none" {...props}>
      <Circle cx={24} cy={24} r={24} fill="url(#prefix__paint0_linear)" />
      <Ellipse cx={33} cy={20} rx={3} ry={4} fill="#000" fillOpacity={0.87} />
      <Ellipse cx={15} cy={20} rx={3} ry={4} fill="#000" fillOpacity={0.87} />
      <Path
        d="M13 29a1 1 0 100 2v-2zm22 2a1 1 0 100-2v2zm-22-1v1h11v-2H13.068h-.004-.004-.004H13.027h-.003-.002-.005-.002-.002-.002-.001-.002-.001-.004H13L13 30zm11 1h10.999L35 30v-1H24v2z"
        fill="#000"
        fillOpacity={0.87}
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={12.5}
          y1={3}
          x2={35}
          y2={45}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#F9C136" />
          <Stop offset={1} stopColor="#F9B306" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

EmojiNormal.propTypes = {
  disabled: PropTypes.bool,
};

EmojiNormal.defaultProps = {
  disabled: false,
};

export default EmojiNormal;
