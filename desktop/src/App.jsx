import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import './i18n';
import './config/init';
import { Navigation } from './screens';
import store from './store';
import theme from './theme';

const AppContents = () => <Navigation />;

const App = () => (
  <ThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Provider store={store}>
        <AppContents />
      </Provider>
    </SnackbarProvider>
  </ThemeProvider>
);

export default App;
