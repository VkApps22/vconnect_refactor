import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

const NotFoundContainer = styled(View)`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 16px;
`;

const NotFoundTitle = styled(Text)`
  color: black;
  font-size: 20px;
  letter-spacing: 0.15px;
  line-height: 24px;
  margin-bottom: 8px;
  text-align: center;
`;

const NotFoundText = styled(Text)`
  color: ${(props) => props.theme.text.lowEmphasis};
  font-size: 14px;
  letter-spacing: 0.25px;
  line-height: 20px;
  text-align: center;
`;

const SearchResultsError = ({ errored, query }) => {
  const { t } = useTranslation();
  return (
    <NotFoundContainer>
      <NotFoundTitle>
        {!errored ? t('item-not-found') : t('something-went-wrong')}
      </NotFoundTitle>
      <NotFoundText>
        {!errored
          ? t('item-not-found-subtext', { word: query })
          : t('something-went-wrong-subtext')}
      </NotFoundText>
    </NotFoundContainer>
  );
};

SearchResultsError.propTypes = {
  errored: PropTypes.bool,
  query: PropTypes.string,
};

SearchResultsError.defaultProps = {
  errored: false,
  query: undefined,
};

export default SearchResultsError;
