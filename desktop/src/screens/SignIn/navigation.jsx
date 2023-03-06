import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import { env } from '../../config';
import SignInScreen from './SignInScreen';

const SignInRoutes = () => {
  return (
    <Switch>
      <Route
        path="/authorize"
        render={() => {
          window.location.href = `${env.NATIVE_REDIRECT_LINK}${document.location.search}`;
        }}
      />
      <Route component={SignInScreen} />
    </Switch>
  );
};

const SignInNavigation = () => {
  return (
    <Router>
      <SignInRoutes />
    </Router>
  );
};

export default SignInNavigation;
