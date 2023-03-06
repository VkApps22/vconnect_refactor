import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

const SearchResultsText = styled(Text)`
  color: ${(props) => props.theme.text.mediumEmphasis};
  padding: 0 16px 16px 16px;
`;

const SearchResultsMessage = ({ refreshing, query, items, total }) => {
  const { t } = useTranslation();
  return (
    <SearchResultsText>
      {refreshing
        ? ''
        : t(
            query && query.length !== 0
              ? 'showing-n-items-with-the-word-x'
              : 'showing-n-items',
            {
              count: items.length,
              total,
              word: query,
            }
          )}
    </SearchResultsText>
  );
};

SearchResultsMessage.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  refreshing: PropTypes.bool,
  total: PropTypes.number,
  query: PropTypes.string,
};

SearchResultsMessage.defaultProps = {
  refreshing: false,
  total: 0,
  query: undefined,
};

export default SearchResultsMessage;
