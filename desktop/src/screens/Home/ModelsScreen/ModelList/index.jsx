import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './Header';
import ModelTable from './ModelTable';

const Container = styled.div`
  background: #ffffff;
  border-radius: 8px;
  margin: 24px 0;
  padding: 24px 0;
  width: 100%;
`;

const ModelList = ({
  searchString,
  setSearchString,
  ratingFilter,
  setRatingFilter,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  list,
  handleDelete,
  ...props
}) => {
  return (
    <Container {...props}>
      <Header
        ratingFilter={ratingFilter}
        handleChangeRatingFilter={setRatingFilter}
        handleChangeSearchString={setSearchString}
      />
      <ModelTable
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        total={total}
        list={list}
        handleDelete={handleDelete}
      />
    </Container>
  );
};

ModelList.propTypes = {
  searchString: PropTypes.string,
  setSearchString: PropTypes.func.isRequired,
  ratingFilter: PropTypes.string,
  setRatingFilter: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  total: PropTypes.number,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      model: PropTypes.string,
      family: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      name: PropTypes.arrayOf(
        PropTypes.shape({
          language: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ),
      rating: PropTypes.oneOf(['positive', 'negative', 'neutral', undefined]),
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
};

ModelList.defaultProps = {
  searchString: undefined,
  ratingFilter: undefined,
  total: undefined,
};

export default ModelList;
