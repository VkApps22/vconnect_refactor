import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { Checkbox } from '../third-party-components';
import TouchableDebounce from '../TouchableDebounce';

const OptionContainer = styled(TouchableDebounce)`
  align-items: center;
  flex-direction: row;
  padding: 12px 16px 12px 18px;
`;

const OptionTitle = styled(Text)`
  color: ${(props) =>
    props.$isSelected
      ? props.theme.text.primary
      : props.theme.text.mediumEmphasis};
  font-size: 16px;
  line-height: 24px;
  margin-left: 26px;
`;

const CheckOption = ({ children, isSelected, onPress, ...props }) => {
  return (
    <OptionContainer onPress={onPress} {...props}>
      <>
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          color="#00447a"
          onPress={onPress}
          uncheckedColor="rgba(0, 0, 0, 0.46)"
        />
        <OptionTitle $isSelected={isSelected}>{children}</OptionTitle>
      </>
    </OptionContainer>
  );
};

CheckOption.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

CheckOption.defaultProps = {
  onPress: () => {},
  isSelected: false,
};

export default CheckOption;
