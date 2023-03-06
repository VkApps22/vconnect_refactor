import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import TouchableDebounce from '../../TouchableDebounce';

const Container = styled(View)`
  align-items: center;
  background: ${(props) => props.theme.toast[props.type].backgroundColor};
  flex-direction: row;
  padding: 16px 30px 16px 16px;
  position: relative;
  width: 100%;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.toast[props.type].color};
  font-size: 16px;
`;

const Description = styled(Text)`
  color: ${(props) => props.theme.toast[props.type].color};
  font-size: 14px;
  margin-top: 5px;
`;

const TextContainer = styled(TouchableDebounce)`
  margin-left: 10px;
`;

const Toast = ({ removeToast, message, ...props }) => {
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => removeToast(), 7000);
    return () => clearTimeout(timer.current);
  }, [removeToast]);

  return (
    <Container type={message.type} {...props}>
      <TextContainer
        onPress={() => {
          clearTimeout(timer.current);
          removeToast();
        }}
      >
        <Title type={message.type}>{message.title}</Title>
        {message.description && (
          <Description type={message.type}>{message.description}</Description>
        )}
      </TextContainer>
    </Container>
  );
};

Toast.propTypes = {
  removeToast: PropTypes.func,
  message: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
  }),
};

Toast.defaultProps = {
  removeToast: () => {},
  message: {
    type: 'info',
  },
};

export default Toast;
