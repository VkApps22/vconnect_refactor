import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import Loading from '../Loading';

const PaginatedList = ({
  items,
  loading,
  refreshing,
  total,
  onLoadMore,
  onRefresh,
  renderItem,
  keyExtractor,
  ...props
}) => {
  const handleNextPage = useCallback(() => {
    if (!refreshing && !loading && items.length < total) {
      onLoadMore(items.length);
    }
  }, [onLoadMore, refreshing, loading, items, total]);

  return (
    <FlatList
      {...props}
      refreshControl={
        <RefreshControl
          colors={['#00447A']}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      data={items}
      useInteraction={false}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      refreshing={loading}
      contentContainerStyle={{ paddingBottom: 60 }}
      onEndReachedThreshold={0.9}
      onEndReached={handleNextPage}
      ListFooterComponent={() => (!refreshing && loading ? <Loading /> : <></>)}
    />
  );
};

PaginatedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  loading: PropTypes.bool,
  refreshing: PropTypes.bool,
  total: PropTypes.number,
  onLoadMore: PropTypes.func.isRequired,
  onRefresh: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
};

PaginatedList.defaultProps = {
  total: 0,
  loading: true,
  refreshing: false,
};

export default PaginatedList;
