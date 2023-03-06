import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { unwrapResult } from '@reduxjs/toolkit';
import PropTypes from 'prop-types';

import {
  fetch,
  selector as modelSelector,
  slice,
} from '../../../../store/model';
import { Button, PaginatedList } from '../../../../components';
import { useToast } from '../../../../hooks/toast';
import FilterIcon from './FilterIcon';
import ModelCard from '../../../../components/ModelCard/ModelCard';
import SearchResultsError from './SearchResultsError';
import SearchResultsMessage from './SearchResultsMessage';
import { selector as authSelector } from '../../../../store/auth';
import { env } from '../../../../config';

const SearchResultsContainer = styled(View)`
  flex: 1;
`;

const FilterBar = styled(View)`
  background: #fff;
  padding: 8px 16px;
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  max-width: 117px;
  min-width: 87px;
`;

const Content = styled(View)`
  flex: 1;
  padding: 24px 0 5px 0;
`;

const getFilterCount = (filter) => {
  let count = 0;
  count += filter && filter.product ? 1 : 0;
  count += filter && filter.family ? 1 : 0;
  count += filter && filter.models ? filter.models.length : 0;
  return count;
};

const SearchResults = ({ query, filter, loadResults, setLoadResults }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const { items, pending, refreshing, errored, total } = useSelector(
    modelSelector
  );
  const [filterCount, setFilterCount] = useState(0);
  const { preferredName } = useSelector(authSelector);

  useEffect(() => {
    dispatch(slice.actions.reset());
  }, [dispatch, query, filter]);

  useEffect(() => {
    setFilterCount(getFilterCount(filter));
  }, [filter]);

  const handleSearch = useCallback(
    (skip) => {
      dispatch(
        fetch({
          language: i18n.languages[0],
          text: query,
          filter: {
            product: filter ? filter.product : undefined,
            family: filter ? filter.family : undefined,
            models: filter && filter.models ? filter.models : [],
          },
          pagination: {
            page: Math.ceil(skip / 10),
            limit: 10,
          },
        })
      )
        .then(unwrapResult)
        .catch(toast.exception);
    },
    [i18n, filter, dispatch, toast, query]
  );

  useEffect(() => {
    if (loadResults) {
      setLoadResults(false);
      dispatch(slice.actions.reset());
      handleSearch(0);
    }
  }, [loadResults, setLoadResults, handleSearch, dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(slice.actions.refresh());
    handleSearch(0);
  }, [handleSearch, dispatch]);

  const keyExtractor = useCallback(({ _id }) => _id, []);
  const renderItem = useCallback(
    ({ item }) => (
      <ModelCard
        item={item}
        hideFavoriteButton={preferredName === env.DEFAULT_USER_NAME}
      />
    ),
    []
  );

  return (
    <SearchResultsContainer>
      <FilterBar>
        <StyledButton
          icon={FilterIcon}
          color="#00447a"
          compact
          uppercase={false}
          onPress={() =>
            navigation.navigate('FilterScreen', {
              query,
              filter,
            })
          }
          mode="contained"
        >
          {filterCount === 0
            ? t('filters')
            : t('filters-n', { n: filterCount })}
        </StyledButton>
      </FilterBar>
      {(items && items.length > 0) || total === undefined ? (
        <Content>
          <SearchResultsMessage
            query={query}
            items={items}
            refreshing={refreshing}
            total={total}
          />
          <PaginatedList
            items={items}
            refreshing={refreshing}
            onLoadMore={handleSearch}
            onRefresh={handleRefresh}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            loading={pending}
            total={total}
          />
        </Content>
      ) : (
        !pending && <SearchResultsError query={query} errored={errored} />
      )}
    </SearchResultsContainer>
  );
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  filter: PropTypes.shape({
    product: PropTypes.string,
    family: PropTypes.string,
    models: PropTypes.arrayOf(PropTypes.string),
  }),
  loadResults: PropTypes.bool,
  setLoadResults: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  loadResults: false,
  filter: {},
};

export default SearchResults;
