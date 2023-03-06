import * as React from 'react';
import { View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

const STATUSBAR_HEIGHT = Constants.statusBarHeight;

const FocusAwareStatusBar = ({ height, backgroundColor, barStyle }) => {
  const isFocused = useIsFocused();

  return (
    <View
      style={[
        { height: height !== undefined ? height : STATUSBAR_HEIGHT },
        { backgroundColor },
      ]}
    >
      {isFocused && (
        <StatusBar
          hidden={false}
          style={barStyle}
          translucent
          backgroundColor={backgroundColor}
        />
      )}
    </View>
  );
};

FocusAwareStatusBar.propTypes = {
  height: PropTypes.number,
  barStyle: PropTypes.string,
  backgroundColor: PropTypes.string,
};

FocusAwareStatusBar.defaultProps = {
  height: undefined,
  barStyle: 'dark',
  backgroundColor: '#fff',
};

export default FocusAwareStatusBar;
