import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

import { Navbar } from '../../components';
import { env } from '../../config';
import AnalyticsScreen from './AnalyticsScreen';
import ModelEditorScreen from './ModelEditorScreen';
import ModelsScreen from './ModelsScreen';
import UsersScreen from './UsersScreen';

const Container = styled.div`
  background: #e5eef4;
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 24px;
`;

const HomeRoutes = () => (
  <Switch>
    <Route path="/analytics" component={AnalyticsScreen} />
    <Route path="/modelEditor" component={ModelEditorScreen} />
    <Route path="/models" component={ModelsScreen} />
    <Route path="/users" component={UsersScreen} />
    <Route
      path="/authorize"
      render={() => {
        window.location.href = `${env.NATIVE_REDIRECT_LINK}${document.location.search}`;
      }}
    />
    <Route component={AnalyticsScreen} />
  </Switch>
);

const HomeNavigation = () => {
  return (
    <Router>
      <Container>
        <Navbar />
        <Content>
          <HomeRoutes />
        </Content>
      </Container>
    </Router>
  );
};

export default HomeNavigation;
