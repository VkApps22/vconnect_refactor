import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import PropTypes from 'prop-types';
import { DefaultTheme, PaperProvider } from '../components';

const color = {
  tintPrimary: '#00447a',
  tintSecondary: '#00a0d1',
  tintTertiary: 'rgba(0,0,0,0.6)',
  lowEmphasis: 'rgba(0, 0, 0, 0.46)',
  mediumEmphasis: 'rgba(0, 0, 0, 0.6)',
  highEmphasis: 'rgba(0,0,0, 0.87)',
  disabled: 'rgba(0, 0, 0, 0.38)',
  accentSuccess: '#0a6230',
  accentError: '#b00020',
  accentWarning: '#7b7112',
  accentInfo: '#00a0d1',
  bgPrimary: '#ffffff',
  bgSecondary: '#f6f6f6',
  bgTertiary: '#f2f9ff',
  bgSuccess: '#e7efea',
  bgError: '#efdfe2',
  bgWarning: '#f6f6df',
  bgInfo: '#f2f9ff',
  textWhite: '#ffffff',
  whiteMediumEmphasis: 'rgba(255, 255, 255, 0.7)',
};

const theme = {
  screen: {
    color: color.tintPrimary,
    backgroundColorPrimary: color.bgPrimary,
    backgroundColor: color.bgSecondary,
  },
  text: {
    primary: color.tintPrimary,
    secundary: color.tintSecondary,
    tertiary: color.tintTertiary,
    disabled: color.disabled,
    highEmphasis: color.highEmphasis,
    mediumEmphasis: color.mediumEmphasis,
    lowEmphasis: color.lowEmphasis,
    white: color.textWhite,
    whiteMediumEmphasis: color.whiteMediumEmphasis,
    accentError: color.accentError,
  },
  input: {
    color: color.tintTertiary,
    iconColor: color.tintTertiary,
    borderColor: color.tintSecondary,
    errorText: {
      color: color.accentError,
    },
    focused: {
      iconColor: color.tintPrimary,
      borderColor: color.tintPrimary,
    },
    errored: {
      borderColor: color.accentError,
    },
  },
  toast: {
    info: {
      color: color.accentInfo,
      backgroundColor: color.bgInfo,
    },
    success: {
      color: color.accentSuccess,
      backgroundColor: color.bgSuccess,
    },
    error: {
      color: color.accentError,
      backgroundColor: color.bgError,
    },
    warning: {
      color: color.accentWarning,
      backgroundColor: color.bgWarning,
    },
  },
  buttonLink: {
    color: color.tintPrimary,
  },
  button: {
    color: color.textWhite,
    backgroundColor: color.tintPrimary,
  },
  fontSizes: {
    smallest: '12px',
    small: '14px',
    medium: '16px',
    large: '24px',
  },
};

const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    placeholder: '#00a0d1',
    text: 'rgba(0,0,0, 0.87)',
    primary: '#00447a',
  },
  roundness: 8,
  elevation: 5,
  animation: {
    ...DefaultTheme.animation,
    scale: 0.5,
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>
    <PaperProvider theme={paperTheme}>{children}</PaperProvider>
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node,
};

Theme.defaultProps = {
  children: [],
};

export default Theme;
