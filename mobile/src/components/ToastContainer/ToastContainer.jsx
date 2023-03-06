import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Toast from './Toast';

export const Container = styled(Animated.View)`
  bottom: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
`;

const ToastContainer = ({ removeToast, message, ...props }) => {
  const [toastMessage, setToastMessage] = useState(undefined);
  const containerY = useRef(new Animated.Value(100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeOutAndRemoveToast = () =>
    Animated.parallel([
      Animated.timing(containerY, {
        toValue: 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => finished && removeToast());

  useEffect(() => {
    if (message) {
      containerY.setValue(80);
      opacity.setValue(0);
      setToastMessage(message);
      Animated.parallel([
        Animated.timing(containerY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [containerY, opacity, message]);

  return (
    <Container
      style={[{ transform: [{ translateY: containerY }], opacity }]}
      {...props}
    >
      {message && (
        <Toast removeToast={fadeOutAndRemoveToast} message={toastMessage} />
      )}
    </Container>
  );
};

ToastContainer.propTypes = {
  removeToast: PropTypes.func,
  message: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
  }),
};

ToastContainer.defaultProps = {
  removeToast: () => {},
  message: undefined,
};

export default ToastContainer;
