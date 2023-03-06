import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { RadioButton } from '../third-party-components';
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

const RadioOption = ({ children, value, onPress, isSelected, ...props }) => {
  return (
    <OptionContainer onPress={onPress} {...props}>
      <>
        <RadioButton
          value={value}
          color="#00447a"
          uncheckedColor="rgba(0, 0, 0, 0.46)"
        />
        <OptionTitle $isSelected={isSelected}>{children}</OptionTitle>
      </>
    </OptionContainer>
  );
};

RadioOption.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

RadioOption.defaultProps = {
  value: '',
  onPress: () => {},
  isSelected: false,
};

export default RadioOption;
