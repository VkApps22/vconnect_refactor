import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import TouchableDebounce from '../TouchableDebounce';

const Container = styled(View)`
  background: #fff;
  border-bottom-color: #e6e9ed;
  border-bottom-width: 1px;
  flex-direction: row;
  padding: 16px 19px;
`;

const Title = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  flex: 1;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-left: 24px;
`;

const DetailsMenuItem = ({ title, leftIcon, onPress, ...props }) => {
  return (
    <TouchableDebounce onPress={onPress}>
      <Container {...props}>
        {leftIcon}
        <Title>{title}</Title>
        <Icon name="open-in-new" size={24} color="rgba(0, 0, 0, 0.54)" />
      </Container>
    </TouchableDebounce>
  );
};

DetailsMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.node.isRequired,
  onPress: PropTypes.func,
};

DetailsMenuItem.defaultProps = {
  onPress: () => {},
};

export default DetailsMenuItem;
