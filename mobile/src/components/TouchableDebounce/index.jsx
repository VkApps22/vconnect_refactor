import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import _ from 'lodash';

const TouchableDebounce = ({
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
    <TouchableOpacity onPress={debouncedOnPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

TouchableDebounce.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node,
  debounceTime: PropTypes.number,
  debounceMaxWait: PropTypes.number,
};

TouchableDebounce.defaultProps = {
  onPress: () => {},
  children: [],
  debounceTime: 1000,
  debounceMaxWait: 3000,
};

export default TouchableDebounce;
