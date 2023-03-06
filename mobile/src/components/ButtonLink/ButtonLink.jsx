import styled from 'styled-components/native';
import * as React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import TouchableDebounce from '../TouchableDebounce';

const StyledText = styled(Text)`
  color: ${(props) => props.theme.buttonLink.color};
`;

const ButtonLink = (props) => {
  const { text, ...otherProps } = props;
  return (
    <TouchableDebounce
      {...otherProps}
      hitSlop={{ top: 16, right: 16, bottom: 16, left: 16 }}
    >
      <StyledText style={otherProps.style}>{text}</StyledText>
    </TouchableDebounce>
  );
};

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonLink;
