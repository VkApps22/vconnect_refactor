import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProductGallery from './ProductGallery';
import SearchResults from './SearchResults';
import SearchWidget from './SearchWidget';
import { FocusAwareStatusBar } from '../../../../components';

const Container = styled(SafeAreaView)`
  background: #e5eef4;
  flex: 1;
`;

const SearchScreen = ({ route }) => {
  const routeParams = route.params;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loadResults, setLoadResults] = useState(false);

  useEffect(() => {
    if (routeParams) {
      setQuery(routeParams.query);
      setFilter(routeParams.filter || {});
      setShowResults(
        !!routeParams.query || Object.keys(routeParams.filter).length !== 0
      );
      setLoadResults(true);
    }
  }, [routeParams]);

  useEffect(() => {
    if (!showResults) setFilter({});
  }, [showResults]);

  useEffect(() => {
    if (showResults && query.length === 0 && Object.keys(filter).length === 0)
      setShowResults(false);
  }, [query, filter, showResults]);

  return (
    <>
      {showResults ? (
        <FocusAwareStatusBar />
      ) : (
        <FocusAwareStatusBar barStyle="light" backgroundColor="#00447a" />
      )}
      <Container edges={['right', 'bottom', 'left']}>
        <SearchWidget
          query={query}
          setQuery={(value) => {
            setQuery(value);
          }}
          showResults={showResults}
          setShowResults={setShowResults}
          setLoadResults={setLoadResults}
          onClearPress={() => {
            setQuery('');
            setShowResults(false);
          }}
        />
        {showResults ? (
          <SearchResults
            query={query}
            filter={filter}
            loadResults={loadResults}
            setLoadResults={setLoadResults}
          />
        ) : (
          <ProductGallery />
        )}
      </Container>
    </>
  );
};

SearchScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string,
      filter: PropTypes.shape({
        product: PropTypes.string,
        family: PropTypes.string,
        models: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
    name: PropTypes.string,
  }),
};

SearchScreen.defaultProps = {
  route: { params: { query: '' }, name: 'Search' },
};

export default SearchScreen;
