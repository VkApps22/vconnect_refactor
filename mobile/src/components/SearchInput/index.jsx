import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Keyboard, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Proptypes from 'prop-types';
import SearchPanel from '../SearchPanel/SearchPanel';
import { Portal, Searchbar } from '../third-party-components';
import TouchableDebounce from '../TouchableDebounce';

const StyledSearchInput = styled(Searchbar)`
  border: 1px solid ${(props) => props.theme.input.borderColor};
  border-radius: 8px;
`;

const SearchInput = ({
  queryValue,
  setQueryValue,
  onSubmitSearch,
  onClearPress,
  ...props
}) => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <View>
      <StyledSearchInput
        inputStyle={{ fontSize: 16 }}
        value={queryValue}
        onFocus={() => setShowPanel(true)}
        onIconPress={onClearPress}
        clearIcon={() =>
          queryValue && queryValue.length > 0 ? (
            <TouchableDebounce onPress={onClearPress}>
              <MaterialIcons
                name="close"
                size={24}
                color="rgba(0, 0, 0, 0.6)"
              />
            </TouchableDebounce>
          ) : (
            <></>
          )
        }
        placeholderTextColor="rgba(0, 0, 0, 0.38)"
        {...props}
      />
      {showPanel && (
        <Portal>
          <SearchPanel
            queryValue={queryValue}
            setQueryValue={(value) => setQueryValue(value)}
            onSubmitSearch={onSubmitSearch}
            onClearPress={onClearPress}
            resumePanel={() => {
              setShowPanel(false);
              Keyboard.dismiss();
            }}
          />
        </Portal>
      )}
    </View>
  );
};

SearchInput.propTypes = {
  queryValue: Proptypes.string.isRequired,
  setQueryValue: Proptypes.func.isRequired,
  onSubmitSearch: Proptypes.func,
  onClearPress: Proptypes.func,
};

SearchInput.defaultProps = {
  onSubmitSearch: () => {},
  onClearPress: () => {},
};

export default SearchInput;
