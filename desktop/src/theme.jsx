import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#00447A' },
    secondary: { main: '#00A0D1' },
    error: { main: '#B00020' },
    warning: { main: '#C03C3C' },
    success: { main: '#1FA83D' },
  },
  typography: {
    h5: {
      fontSize: '2.5rem',
      color: '#00447a',
    },
    h6: {
      fontSize: '2.125rem',
      color: 'rgba(0, 0, 0, 0.87)',
      fontWeight: 'normal',
    },
    caption: {
      fontSize: '0.875rem',
      color: 'rgba(0, 0, 0, 0.6)',
    },
    subtitle2: {
      fontSize: '1.125rem',
      fontWeight: 500,
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  overrides: {
    MuiOutlinedInput: {
      input: {
        '&:focus': {
          color: '#00447A',
        },
      },
      notchedOutline: {
        borderColor: '#00a0d1',
      },
    },
    MuiList: {
      root: {
        maxWidth: 290,
      },
    },
    MuiChip: {
      root: {
        fontSize: '0.875rem',
        letterSpacing: 0.4,
        height: 36,
      },
      colorSecondary: {
        border: '1px solid #007DA7',
      },
      outlined: {
        color: 'rgba(0, 0, 0, 0.6)',
      },
    },
    MuiStepper: {
      root: {
        borderRadius: 8,
      },
    },
    MuiStepLabel: {
      label: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: 500,
        fontSize: 22,
      },
    },
    MuiStepContent: {
      root: {
        paddingLeft: 66,
        paddingTop: 32,
      },
    },
    MuiInputLabel: {
      root: {
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: '1.25rem',
        marginBottom: 8,
        letterSpacing: 0.5,
      },
    },
    MuiAutocomplete: {
      root: {
        heigth: 56,
      },
    },
    MuiFormHelperText: {
      root: {
        paddingLeft: 12,
      },
    },
    MuiTab: {
      root: {
        padding: '24px 0px',
        background: '#f3f3f3',
        boxShadow: 'none',
        '&$selected': {
          background: '#FFFFFF',
          boxShadow: '1px -1px 4px rgba(0, 0, 0, 0.15)',
        },
      },
      selected: {},
      wrapper: {
        textTransform: 'none',
        color: 'rgba(0, 0, 0, 0.87)',
        fontWeight: 500,
        fontSize: '1.125rem',
      },
    },
  },
});

export default theme;
