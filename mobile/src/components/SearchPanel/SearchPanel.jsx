import React, { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Path } from 'react-native-svg';
import Proptypes from 'prop-types';
import styled from 'styled-components/native';
import { Dimensions, ScrollView, Text, TextInput, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TouchableDebounce from '../TouchableDebounce';
import { Divider } from '../third-party-components';

const window = Dimensions.get('window');

const OverlayView = styled(SafeAreaView)`
  background: #fff;
  flex: 1;
  height: 100%;
  position: absolute;
  width: ${window.width}px;
`;

const StyledInput = styled(TextInput)`
  background: #fff;
  color: ${(props) => props.theme.text.primary};
  flex: 1;
  font-size: 16px;
  line-height: 24px;
`;

const SearchHeader = styled(View)`
  align-items: center;
  flex-direction: row;
  padding: 16px 21px 16px 19px;
`;

const SearchBackButton = styled(TouchableDebounce)`
  margin-right: 27px;
`;

const SearchCloseButton = styled(Icon)`
  color: ${(props) => props.theme.text.mediumEmphasis};
`;

const SearchInputDivider = styled(Divider)`
  background: #e6e9ed;
  height: 2px;
`;

const SearchResults = styled(ScrollView)`
  flex: 1;
  padding: 0 16px;
`;

const SearchResultContainer = styled(TouchableDebounce)`
  padding-top: 12px;
`;

const SearchResultContent = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-bottom: 14px;
`;

const SearchResultIcon = styled(Icon)`
  color: ${(props) => props.theme.text.disabled};
  font-size: 20px;
`;

const SearchResultText = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  font-size: 14px;
  line-height: 24px;
  margin-left: 26px;
`;

const SearchResultDivider = styled(Divider)`
  color: #e6e9ed;
  height: 1px;
`;

const SearchPanel = ({
  queryValue,
  setQueryValue,
  resumePanel,
  onSubmitSearch,
  onClearPress,
  ...props
}) => {
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentFiltered, setRecentFiltered] = useState([]);
  const [inputValue, setInputValue] = useState(queryValue);
  const inputElementRef = useRef(null);

  useEffect(() => setInputValue(queryValue), [queryValue]);

  useEffect(() => {
    if (inputElementRef) {
      inputElementRef.current.focus();
    }

    async function loadRecentSearches() {
      const recentLoad =
        JSON.parse(await AsyncStorage.getItem('recentSearches')) || [];
      setRecentSearches(recentLoad);
      setRecentFiltered(recentLoad);
    }

    loadRecentSearches();
  }, []);

  const filterRecentSearches = (value) => {
    setRecentFiltered(
      recentSearches.filter(({ title }) =>
        title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleClosePanel = () => {
    setQueryValue('');
    setInputValue('');
    resumePanel();
    onClearPress();
  };

  const handleChangeText = (value) => {
    if (value === '') {
      handleClosePanel();
    } else {
      setInputValue(value);
      filterRecentSearches(value);
    }
  };

  const setNewRecentSearch = async (value) => {
    const newRecentSearches = [
      { title: value, id: new Date().getTime() },
      ...recentSearches.filter((search) => search.title !== value),
    ];
    setRecentSearches(newRecentSearches.slice(0, 15));

    await AsyncStorage.setItem(
      'recentSearches',
      JSON.stringify(newRecentSearches.slice(0, 15))
    );
  };

  const handleSubmit = (text) => {
    setQueryValue(text);
    setNewRecentSearch(text);
    resumePanel();
    onSubmitSearch(text);
  };

  return (
    <OverlayView {...props}>
      <SearchHeader>
        <SearchBackButton
          onPress={() => resumePanel()}
          hitSlop={{ top: 22, right: 22, bottom: 22, left: 22 }}
        >
          <Svg width={18} height={12} viewBox="0 0 18 12" fill="none">
            <Path
              d="M18 5H3.83l3.58-3.59L6 0 0 6l6 6 1.41-1.41L3.83 7H18V5z"
              fill="#00447A"
            />
          </Svg>
        </SearchBackButton>
        <StyledInput
          ref={inputElementRef}
          value={inputValue}
          onChangeText={(value) => handleChangeText(value)}
          onSubmitEditing={(event) => {
            event.preventDefault();
            handleSubmit(inputValue);
          }}
          autoCapitalize="none"
          returnKeyType="search"
        />
        <TouchableDebounce
          onPress={handleClosePanel}
          hitSlop={{ top: 20, right: 16, bottom: 20, left: 16 }}
        >
          <SearchCloseButton name="close" size={23} />
        </TouchableDebounce>
      </SearchHeader>
      <SearchInputDivider />
      <SearchResults bounces={false} keyboardShouldPersistTaps="always">
        {recentFiltered &&
          recentFiltered.map(({ id, title }) => (
            <SearchResultContainer onPress={() => handleSubmit(title)} key={id}>
              <SearchResultContent>
                <SearchResultIcon name="access-time" />
                <SearchResultText>{title}</SearchResultText>
              </SearchResultContent>
              <SearchResultDivider />
            </SearchResultContainer>
          ))}
      </SearchResults>
    </OverlayView>
  );
};

SearchPanel.propTypes = {
  queryValue: Proptypes.string,
  setQueryValue: Proptypes.func.isRequired,
  resumePanel: Proptypes.func,
  onSubmitSearch: Proptypes.func,
  onClearPress: Proptypes.func,
};

SearchPanel.defaultProps = {
  queryValue: '',
  resumePanel: () => {},
  onSubmitSearch: () => {},
  onClearPress: () => {},
};

export default SearchPanel;
