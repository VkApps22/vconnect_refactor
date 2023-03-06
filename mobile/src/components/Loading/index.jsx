import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

const Container = styled(View)`
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const Loading = () => (
  <Container>
    <ActivityIndicator color="#00447A" size="large" />
  </Container>
);

export default Loading;
