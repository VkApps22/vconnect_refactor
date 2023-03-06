import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { SearchInput } from '../../../../components';

const GalleryHeaderContainer = styled(View)`
  background: #00447a;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-color: #00447a;
`;

const ResultsHeaderContainer = styled(View)`
  background: #fff;
`;

const SearchContainer = styled(View)`
  padding: 4px 16px 16px 16px;
`;

const SearchWidget = ({
  query,
  setQuery,
  showResults,
  setLoadResults,
  setShowResults,
  onClearPress,
}) => {
  const { t } = useTranslation();
  const HeaderContainer = showResults
    ? ResultsHeaderContainer
    : GalleryHeaderContainer;

  return (
    <HeaderContainer>
      <SearchContainer>
        <SearchInput
          queryValue={query}
          setQueryValue={(value) => setQuery(value)}
          onSubmitSearch={(value) => {
            setQuery(value);
            setShowResults(true);
            setLoadResults(true);
          }}
          placeholder={t('search-by-products-families')}
          onClearPress={onClearPress}
        />
      </SearchContainer>
    </HeaderContainer>
  );
};

SearchWidget.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  showResults: PropTypes.bool.isRequired,
  setShowResults: PropTypes.func.isRequired,
  setLoadResults: PropTypes.func.isRequired,
  onClearPress: PropTypes.func.isRequired,
};

export default SearchWidget;
