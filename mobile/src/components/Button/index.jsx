import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Button as PaperButton } from '../third-party-components';

const Button = ({
  onPress,
  children,
  debounceTime,
  debounceMaxWait,
  ...props
}) => {
  const debouncedOnPress = useMemo(
    () =>
      _.debounce(onPress, debounceTime, {
        leading: true,
        trailing: false,
        maxWait: debounceMaxWait,
      }),
    [onPress, debounceTime, debounceMaxWait]
  );

  return (
    <PaperButton onPress={debouncedOnPress} {...props}>
      {children}
    </PaperButton>
  );
};

Button.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  debounceTime: PropTypes.number,
  debounceMaxWait: PropTypes.number,
};

Button.defaultProps = {
  onPress: () => {},
  children: [],
  debounceTime: 1000,
  debounceMaxWait: 3000,
};

export default Button;
