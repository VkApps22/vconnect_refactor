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

function EmojiSadDisabled({ disabled, ...props }) {
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
        d="M9.2 29.4a1 1 0 001.6 1.2l-1.6-1.2zm20 1.2a1 1 0 001.6-1.2l-1.6 1.2zm-18.4 0c2.314-3.083 5.348-4.6 9.2-4.6v-2c-4.482 0-8.108 1.814-10.8 5.4l1.6 1.2zM20 26c3.852 0 6.886 1.517 9.2 4.6l1.6-1.2C28.108 25.814 24.48 24 20 24v2z"
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
        d="M11.2 35.4a1 1 0 001.6 1.2l-1.6-1.2zm24 1.2a1 1 0 101.6-1.2l-1.6 1.2zm-22.4 0C15.614 32.85 19.315 31 24 31v-2c-5.315 0-9.608 2.147-12.8 6.4l1.6 1.2zM24 31c4.685 0 8.386 1.85 11.2 5.6l1.6-1.2C33.608 31.147 29.315 29 24 29v2z"
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

EmojiSadDisabled.propTypes = {
  disabled: PropTypes.bool,
};

EmojiSadDisabled.defaultProps = {
  disabled: false,
};

export default EmojiSadDisabled;
