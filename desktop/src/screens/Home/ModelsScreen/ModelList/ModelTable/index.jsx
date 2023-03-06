import React from 'react';
import { Table, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { styled as materialStyled } from '@material-ui/core/styles';

import ModelTablePagination from './ModelTablePagination';
import ModelTableHead from './ModelTableHead';
import ModelTableBody from './ModelTableBody';

const Container = styled.div`
  margin: 0 79px;
  width: auto;
`;

const Empty = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  height: 60px;
  justify-content: center;
  text-align: center;
`;

const EmptyText = materialStyled(Typography)({
  color: '#000000',
  fontSize: '16px',
  fontWeight: 400,
  letterSpacing: 1,
  marginBottom: 8,
});

const ModelTable = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  list,
  handleDelete,
  ...props
}) => {
  const { t } = useTranslation();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container {...props}>
      <Table>
        <ModelTableHead />
        <ModelTableBody handleDelete={handleDelete} list={list} />
      </Table>
      {total !== 0 && (
        <ModelTablePagination
          length={total}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
      {total === 0 && (
        <Empty>
          <EmptyText>{t('no-results-found')}</EmptyText>
        </Empty>
      )}
    </Container>
  );
};

ModelTable.propTypes = {
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
  ),
  handleDelete: PropTypes.func.isRequired,
};

ModelTable.defaultProps = {
  list: [],
  total: undefined,
};

export default ModelTable;
