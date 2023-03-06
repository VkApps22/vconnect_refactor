import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import * as PropTypes from 'prop-types';

import { BackIcon } from '../icons';
import TouchableDebounce from '../TouchableDebounce';

const Button = styled(TouchableDebounce)`
  margin-left: 3px;
`;

export const NavBackButton = ({ canGoBack, onPress }) =>
  canGoBack ? <BackButton onPress={onPress} /> : undefined;
NavBackButton.propTypes = {
  onPress: PropTypes.func,
  canGoBack: PropTypes.bool,
};
NavBackButton.defaultProps = {
  onPress: undefined,
  canGoBack: false,
};

const BackButton = ({ renderIcon, onPress }) => {
  const navigation = useNavigation();

  return (
    <Button
      hitSlop={{ top: 16, right: 16, bottom: 16, left: 16 }}
      onPress={!onPress ? () => navigation.goBack() : onPress}
    >
      {renderIcon ? renderIcon() : <BackIcon />}
    </Button>
  );
};

BackButton.propTypes = {
  renderIcon: PropTypes.func,
  onPress: PropTypes.func,
};

BackButton.defaultProps = {
  renderIcon: undefined,
  onPress: undefined,
};

export default BackButton;
