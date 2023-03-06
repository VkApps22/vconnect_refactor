import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { pendingSelector } from '../../store/global';
import { Portal } from '../third-party-components';

const Container = styled(View)`
  background-color: rgba(0, 0, 0, 0.25);
  flex: 1;
  height: 100%;
  justify-content: center;
  position: absolute;
  width: 100%;
`;

const StyledActivityIndicator = styled(ActivityIndicator).attrs({
  color: '#084178',
  size: 75,
})``;

const LoadingOverlay = () => {
  const { pending } = useSelector(pendingSelector);
  return (
    pending && (
      <Portal>
        <Container>
          <StyledActivityIndicator />
        </Container>
      </Portal>
    )
  );
};

export default LoadingOverlay;
